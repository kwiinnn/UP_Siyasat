<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::with('department')->get());
    }

    public function show($id)
    {
        return response()->json(User::with('department')->findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'institutional_id' => 'required|string|max:20|unique:user,institutional_id',
            'first_name'       => 'required|string|max:50',
            'last_name'        => 'required|string|max:50',
            'email_address'    => 'required|email|unique:user,email_address',
            'password'         => 'required|string|min:8',
            'account_role'     => 'required|in:Student,Faculty,Colsec_Admin',
            'department_id'    => 'required|exists:department,department_id',
        ]);

        $data['password_hash'] = Hash::make($data['password']);
        unset($data['password']);

        return response()->json(User::create($data), 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'first_name'    => 'sometimes|string|max:50',
            'last_name'     => 'sometimes|string|max:50',
            'account_role'  => 'sometimes|in:Student,Faculty,Colsec_Admin',
            'department_id' => 'sometimes|exists:department,department_id',
            'password'      => 'sometimes|string|min:8',
        ]);

        if (isset($data['password'])) {
            $data['password_hash'] = Hash::make($data['password']);
            unset($data['password']);
        }

        $user->update($data);
        return response()->json($user);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User deleted successfully.']);
    }
}