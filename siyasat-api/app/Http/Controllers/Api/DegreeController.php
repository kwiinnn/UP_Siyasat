<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Degree;
use Illuminate\Http\Request;

class DegreeController extends Controller
{
    public function index(Request $request)
    {
        $query = Degree::with('department');

        if ($request->filled('department_id'))
            $query->where('department_id', $request->department_id);

        if ($request->filled('level'))
            $query->where('degree_level', $request->level);

        return response()->json($query->get());
    }

    public function show($id)
    {
        return response()->json(Degree::with('department')->findOrFail($id));
    }
}