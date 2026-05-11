<?php

namespace App\Filament\Resources\Degrees\Tables;

use App\Models\Department;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DegreesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('degree_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('degree_name')
                    ->label('Degree')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('degree_code')
                    ->label('Code')
                    ->badge()
                    ->color('gray')
                    ->searchable(),

                TextColumn::make('degree_level')
                    ->label('Level')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Undergraduate' => 'info',
                        'Postgraduate'  => 'success',
                        default         => 'gray',
                    }),

                TextColumn::make('department.department_name')
                    ->label('Department')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('department.college_name')
                    ->label('College')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'CSM'  => 'info',
                        'CHSS' => 'success',
                        'SOM'  => 'warning',
                        default => 'gray',
                    }),
            ])
            ->filters([
                SelectFilter::make('degree_level')
                    ->label('Level')
                    ->options([
                        'Undergraduate' => 'Undergraduate',
                        'Postgraduate'  => 'Postgraduate',
                    ]),

                SelectFilter::make('department_id')
                    ->label('Department')
                    ->options(
                        Department::all()->pluck('department_name', 'department_id')
                    ),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->before(function ($record, $action) {
                        if ($record->researchDocuments()->count() > 0) {
                            $action->cancel();
                            \Filament\Notifications\Notification::make()
                                ->danger()
                                ->title('Cannot delete degree')
                                ->body('This degree is linked to existing documents.')
                                ->send();
                        }
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('department_id');
    }
}