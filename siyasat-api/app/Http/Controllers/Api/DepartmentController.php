<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        return response()->json(Department::with('degrees')->get());
    }

    public function show($id)
    {
        $dept = Department::with('degrees')
            ->withCount('researchDocuments')
            ->findOrFail($id);
        return response()->json($dept);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'department_name' => 'required|string|max:100|unique:department,department_name',
            'department_code' => 'required|string|max:10|unique:department,department_code',
            'college_name'    => 'required|in:CSM,CHSS,SOM',
        ]);

        return response()->json(Department::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $dept = Department::findOrFail($id);

        $data = $request->validate([
            'department_name' => 'sometimes|string|max:100|unique:department,department_name,' . $id . ',department_id',
            'department_code' => 'sometimes|string|max:10|unique:department,department_code,' . $id . ',department_id',
            'college_name'    => 'sometimes|in:CSM,CHSS,SOM',
        ]);

        $dept->update($data);
        return response()->json($dept);
    }

    public function destroy($id)
    {
        $dept = Department::findOrFail($id);

        if ($dept->researchDocuments()->count() > 0) {
            return response()->json([
                'message' => 'Cannot delete department linked to existing documents.'
            ], 422);
        }

        $dept->delete();
        return response()->json(['message' => 'Department deleted successfully.']);
    }
}