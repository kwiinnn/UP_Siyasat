<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // Only allow UP institutional emails
        if (!str_ends_with($request->email, '@up.edu.ph')) {
            return response()->json([
                'message' => 'Only UP Mindanao institutional emails are allowed.'
            ], 403);
        }

        // Find user by email_address column
        $user = User::where('email_address', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json([
                'message' => 'Invalid credentials.'
            ], 401);
        }

        $token = $user->createToken('sanctum-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'           => $user->user_id,
                'first_name'   => $user->first_name,
                'last_name'    => $user->last_name,
                'email'        => $user->email_address,
                'role'         => $user->account_role,
                'department_id'=> $user->department_id,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully.']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id'            => $user->user_id,
            'first_name'    => $user->first_name,
            'last_name'     => $user->last_name,
            'email'         => $user->email_address,
            'role'          => $user->account_role,
            'department_id' => $user->department_id,
        ]);
    }
}