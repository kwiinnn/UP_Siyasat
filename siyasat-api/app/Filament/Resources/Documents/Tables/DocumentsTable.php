<?php

namespace App\Filament\Resources\Documents\Tables;

use App\Models\Department;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('document_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('title')
                    ->label('Title')
                    ->searchable()
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->title),

                TextColumn::make('document_type')
                    ->label('Type')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Undergraduate' => 'info',
                        'Postgraduate'  => 'success',
                        'Faculty'       => 'warning',
                        default         => 'gray',
                    }),

                TextColumn::make('department.department_code')
                    ->label('Dept.')
                    ->sortable()
                    ->badge()
                    ->color('gray'),

                TextColumn::make('degree.degree_code')
                    ->label('Degree')
                    ->badge()
                    ->color('gray'),

                TextColumn::make('publication_year')
                    ->label('Year')
                    ->sortable(),

                TextColumn::make('upload_date')
                    ->label('Uploaded')
                    ->date('M d, Y')
                    ->sortable(),

                IconColumn::make('drive_url')
                    ->label('Drive')
                    ->boolean()
                    ->trueIcon('heroicon-o-link')
                    ->falseIcon('heroicon-o-x-mark')
                    ->getStateUsing(fn ($record) => !empty($record->drive_url)),
            ])
            ->filters([
                SelectFilter::make('document_type')
                    ->label('Type')
                    ->options([
                        'Undergraduate' => 'Undergraduate',
                        'Postgraduate'  => 'Postgraduate',
                        'Faculty'       => 'Faculty',
                    ]),

                SelectFilter::make('department_id')
                    ->label('Department')
                    ->options(
                        Department::all()->pluck('department_name', 'department_id')
                    ),

                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
                RestoreAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('upload_date', 'desc');
    }
}