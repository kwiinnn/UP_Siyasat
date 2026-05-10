<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('institutional_id')
                    ->label('Institutional ID')
                    ->searchable(),

                TextColumn::make('last_name')
                    ->label('Last Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('first_name')
                    ->label('First Name')
                    ->searchable(),

                TextColumn::make('email_address')
                    ->label('Email')
                    ->searchable(),

                TextColumn::make('account_role')
                    ->label('Role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Colsec_Admin' => 'danger',
                        'Faculty'      => 'warning',
                        'Student'      => 'info',
                        default        => 'gray',
                    }),

                TextColumn::make('department.department_code')
                    ->label('Dept.')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('created_at')
                    ->label('Created')
                    ->date('M d, Y')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('account_role')
                    ->label('Role')
                    ->options([
                        'Student'      => 'Student',
                        'Faculty'      => 'Faculty',
                        'Colsec_Admin' => 'College Secretary Admin',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('last_name');
    }
}