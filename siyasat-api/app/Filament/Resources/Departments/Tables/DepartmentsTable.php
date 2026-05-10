<?php

namespace App\Filament\Resources\Departments\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DepartmentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('department_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('department_name')
                    ->label('Department')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('department_code')
                    ->label('Code')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('college_name')
                    ->label('College')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'CSM'  => 'info',
                        'CHSS' => 'success',
                        'SOM'  => 'warning',
                        default => 'gray',
                    }),

                TextColumn::make('researchDocuments_count')
                    ->label('Documents')
                    ->counts('researchDocuments')
                    ->badge()
                    ->color('gray'),
            ])
            ->filters([
                SelectFilter::make('college_name')
                    ->label('College')
                    ->options([
                        'CSM'  => 'College of Sciences and Mathematics',
                        'CHSS' => 'College of Humanities and Social Sciences',
                        'SOM'  => 'School of Management',
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->before(function ($record, $action) {
                        if ($record->researchDocuments()->count() > 0) {
                            $action->cancel();
                            \Filament\Notifications\Notification::make()
                                ->danger()
                                ->title('Cannot delete department')
                                ->body('This department is linked to existing documents.')
                                ->send();
                        }
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('college_name');
    }
}