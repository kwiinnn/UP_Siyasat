<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DegreeController;
use App\Http\Controllers\Api\UserController;

// ── Public routes ─────────────────────────────────────────
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/documents',           [DocumentController::class, 'index']);
Route::get('/documents/{id}',      [DocumentController::class, 'show']);
Route::get('/stats',               [DocumentController::class, 'stats']);

Route::get('/authors',             [AuthorController::class, 'index']);
Route::get('/authors/{id}',        [AuthorController::class, 'show']);

Route::get('/departments',         [DepartmentController::class, 'index']);
Route::get('/departments/{id}',    [DepartmentController::class, 'show']);

Route::get('/categories',          [CategoryController::class, 'index']);

Route::get('/degrees',             [DegreeController::class, 'index']);
Route::get('/degrees/{id}',        [DegreeController::class, 'show']);

Route::get('/browse/undergraduate',[DocumentController::class, 'index'])->defaults('type', 'Undergraduate');
Route::get('/browse/postgraduate', [DocumentController::class, 'index'])->defaults('type', 'Postgraduate');
Route::get('/browse/faculty',      [DocumentController::class, 'index'])->defaults('type', 'Faculty');

// ── Protected routes (Sanctum token required) ─────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me',     [AuthController::class, 'me']);

    Route::post('/documents',         [DocumentController::class, 'store']);
    Route::put('/documents/{id}',     [DocumentController::class, 'update']);
    Route::delete('/documents/{id}',  [DocumentController::class, 'destroy']);

    Route::post('/authors',           [AuthorController::class, 'store']);
    Route::put('/authors/{id}',       [AuthorController::class, 'update']);
    Route::delete('/authors/{id}',    [AuthorController::class, 'destroy']);

    Route::post('/departments',       [DepartmentController::class, 'store']);
    Route::put('/departments/{id}',   [DepartmentController::class, 'update']);
    Route::delete('/departments/{id}',[DepartmentController::class, 'destroy']);

    Route::post('/categories',        [CategoryController::class, 'store']);
    Route::put('/categories/{id}',    [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::apiResource('users', UserController::class);
});