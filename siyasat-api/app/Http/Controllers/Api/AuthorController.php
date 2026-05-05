<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index(Request $request)
    {
        $query = Author::query();

        if ($request->filled('q')) {
            $q = $request->q;
            $query->where('first_name', 'like', "%{$q}%")
                  ->orWhere('last_name', 'like', "%{$q}%");
        }

        return response()->json($query->get());
    }

    public function show($id)
    {
        $author = Author::with('researchDocuments')->findOrFail($id);
        return response()->json($author);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name'     => 'required|string|max:50',
            'last_name'      => 'required|string|max:50',
            'middle_initial' => 'nullable|string|max:5',
            'affiliation'    => 'nullable|string|max:100',
        ]);

        $author = Author::create($data);
        return response()->json($author, 201);
    }

    public function update(Request $request, $id)
    {
        $author = Author::findOrFail($id);

        $data = $request->validate([
            'first_name'     => 'sometimes|string|max:50',
            'last_name'      => 'sometimes|string|max:50',
            'middle_initial' => 'nullable|string|max:5',
            'affiliation'    => 'nullable|string|max:100',
        ]);

        $author->update($data);
        return response()->json($author);
    }

    public function destroy($id)
    {
        $author = Author::findOrFail($id);

        if ($author->researchDocuments()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete author linked to existing documents.'
            ], 422);
        }

        $author->delete();
        return response()->json(['message' => 'Author deleted successfully.']);
    }
}