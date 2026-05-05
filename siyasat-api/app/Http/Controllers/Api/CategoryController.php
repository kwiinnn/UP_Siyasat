<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_name' => 'required|string|max:50|unique:category,category_name',
            'description'   => 'nullable|string|max:255',
        ]);

        return response()->json(Category::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $data = $request->validate([
            'category_name' => 'sometimes|string|max:50|unique:category,category_name,' . $id . ',category_id',
            'description'   => 'nullable|string|max:255',
        ]);

        $category->update($data);
        return response()->json($category);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);

        if ($category->researchDocuments()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete category linked to existing documents.'
            ], 422);
        }

        $category->delete();
        return response()->json(['message' => 'Category deleted successfully.']);
    }
}