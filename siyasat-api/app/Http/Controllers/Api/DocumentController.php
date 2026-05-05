<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ResearchDocument;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    // GET /api/documents
    public function index(Request $request)
    {
        $query = ResearchDocument::with([
            'authors', 'categories', 'department', 'degree', 'uploader'
        ]);

        if ($request->filled('type'))
            $query->where('document_type', $request->type);

        if ($request->filled('department_id'))
            $query->where('department_id', $request->department_id);

        if ($request->filled('college'))
            $query->whereHas('department', fn($d) =>
                $d->where('college_name', $request->college)
            );

        if ($request->filled('year'))
            $query->where('publication_year', $request->year);

        if ($request->filled('category_id'))
            $query->whereHas('categories', fn($c) =>
                $c->where('category.category_id', $request->category_id)
            );

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where(function ($sub) use ($q) {
                $sub->where('title', 'like', "%{$q}%")
                    ->orWhere('abstract', 'like', "%{$q}%")
                    ->orWhereHas('authors', fn($a) =>
                        $a->where('first_name', 'like', "%{$q}%")
                          ->orWhere('last_name', 'like', "%{$q}%")
                    );
            });
        }

        return response()->json($query->latest('upload_date')->get());
    }

    // GET /api/documents/{id}
    public function show($id)
    {
        $doc = ResearchDocument::with([
            'authors', 'categories', 'department', 'degree', 'uploader'
        ])->findOrFail($id);

        return response()->json($doc);
    }

    // POST /api/documents
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'            => 'required|string|max:255',
            'abstract'         => 'required|string',
            'publication_year' => 'required|digits:4|integer',
            'document_type'    => 'required|in:Undergraduate,Postgraduate,Faculty',
            'degree_id'        => 'nullable|exists:degree,degree_id',
            'drive_url'        => 'nullable|url|max:500',
            'department_id'    => 'required|exists:department,department_id',
            'author_ids'       => 'required|array|min:1',
            'author_ids.*'     => 'exists:author,author_id',
            'category_ids'     => 'nullable|array',
            'category_ids.*'   => 'exists:category,category_id',
        ]);

        $data['uploader_id'] = $request->user()->user_id;

        $doc = ResearchDocument::create($data);
        $doc->authors()->attach($data['author_ids']);

        if (!empty($data['category_ids']))
            $doc->categories()->attach($data['category_ids']);

        return response()->json(
            $doc->load(['authors', 'categories', 'department', 'degree']),
            201
        );
    }

    // PUT /api/documents/{id}
    public function update(Request $request, $id)
    {
        $doc = ResearchDocument::findOrFail($id);

        $data = $request->validate([
            'title'            => 'sometimes|string|max:255',
            'abstract'         => 'sometimes|string',
            'publication_year' => 'sometimes|digits:4|integer',
            'document_type'    => 'sometimes|in:Undergraduate,Postgraduate,Faculty',
            'degree_id'        => 'nullable|exists:degree,degree_id',
            'drive_url'        => 'nullable|url|max:500',
            'department_id'    => 'sometimes|exists:department,department_id',
            'author_ids'       => 'sometimes|array|min:1',
            'author_ids.*'     => 'exists:author,author_id',
            'category_ids'     => 'nullable|array',
            'category_ids.*'   => 'exists:category,category_id',
        ]);

        $doc->update($data);

        if ($request->has('author_ids'))
            $doc->authors()->sync($data['author_ids']);

        if ($request->has('category_ids'))
            $doc->categories()->sync($data['category_ids'] ?? []);

        return response()->json(
            $doc->load(['authors', 'categories', 'department', 'degree'])
        );
    }

    // DELETE /api/documents/{id}
    public function destroy($id)
    {
        $doc = ResearchDocument::findOrFail($id);
        $doc->delete();
        return response()->json(['message' => 'Document deleted successfully.']);
    }

    // GET /api/stats
    public function stats()
    {
        return response()->json([
            'total_documents' => ResearchDocument::count(),
            'by_type'         => ResearchDocument::selectRaw('document_type, count(*) as count')
                                    ->groupBy('document_type')->pluck('count', 'document_type'),
            'by_college'      => ResearchDocument::join('department', 'research_document.department_id', '=', 'department.department_id')
                                    ->selectRaw('college_name, count(*) as count')
                                    ->groupBy('college_name')->pluck('count', 'college_name'),
            'by_year'         => ResearchDocument::selectRaw('publication_year, count(*) as count')
                                    ->groupBy('publication_year')->pluck('count', 'publication_year'),
        ]);
    }
}