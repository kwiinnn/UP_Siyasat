<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Models\Department;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('institutional_id')
                    ->label('Institutional ID')
                    ->required()
                    ->maxLength(20),

                TextInput::make('first_name')
                    ->label('First Name')
                    ->required()
                    ->maxLength(50),

                TextInput::make('last_name')
                    ->label('Last Name')
                    ->required()
                    ->maxLength(50),

                TextInput::make('email_address')
                    ->label('UP Email Address')
                    ->required()
                    ->email()
                    ->maxLength(100)
                    ->suffixIcon('heroicon-o-envelope'),

                TextInput::make('password_hash')
                    ->label('Password')
                    ->password()
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                    ->dehydrated(fn ($state) => filled($state))
                    ->required(fn (string $operation) => $operation === 'create')
                    ->maxLength(255),

                Select::make('account_role')
                    ->label('Role')
                    ->required()
                    ->options([
                        'Student'      => 'Student',
                        'Faculty'      => 'Faculty',
                        'Colsec_Admin' => 'College Secretary Admin',
                    ]),

                Select::make('department_id')
                    ->label('Department')
                    ->required()
                    ->options(
                        Department::all()->pluck('department_name', 'department_id')
                    )
                    ->searchable(),
            ]);
    }
}