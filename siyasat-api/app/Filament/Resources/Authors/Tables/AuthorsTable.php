<?php

namespace App\Filament\Resources\Authors\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('author_id')
                    ->label('ID')
                    ->sortable()
                    ->width(60),

                TextColumn::make('last_name')
                    ->label('Last Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('first_name')
                    ->label('First Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('middle_initial')
                    ->label('M.I.')
                    ->width(60),

                TextColumn::make('affiliation')
                    ->label('Affiliation')
                    ->searchable(),

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
                                ->title('Cannot delete author')
                                ->body('This author is linked to existing documents.')
                                ->send();
                        }
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('last_name');
    }
}