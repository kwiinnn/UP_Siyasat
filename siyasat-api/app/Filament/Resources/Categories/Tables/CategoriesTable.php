<?php

namespace App\Filament\Resources\Categories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('category_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('category_name')
                    ->label('Category')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('description')
                    ->label('Description')
                    ->limit(60)
                    ->placeholder('—'),

                TextColumn::make('researchDocuments_count')
                    ->label('Documents')
                    ->counts('researchDocuments')
                    ->badge()
                    ->color('gray'),
            ])
            ->filters([])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->before(function ($record, $action) {
                        if ($record->researchDocuments()->count() > 0) {
                            $action->cancel();
                            \Filament\Notifications\Notification::make()
                                ->danger()
                                ->title('Cannot delete category')
                                ->body('This category is linked to existing documents.')
                                ->send();
                        }
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('category_name');
    }
}