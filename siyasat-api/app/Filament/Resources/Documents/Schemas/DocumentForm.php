<?php

namespace App\Filament\Resources\Documents\Schemas;

use App\Models\Author;
use App\Models\Department;
use App\Models\Degree;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Document Information')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),

                        Textarea::make('abstract')
                            ->required()
                            ->rows(6)
                            ->columnSpanFull(),

                        Select::make('document_type')
                            ->label('Document Type')
                            ->required()
                            ->options([
                                'Undergraduate' => 'Undergraduate',
                                'Postgraduate'  => 'Postgraduate',
                                'Faculty'       => 'Faculty',
                            ])
                            ->live(),

                        TextInput::make('publication_year')
                            ->label('Publication Year')
                            ->required()
                            ->numeric()
                            ->minValue(1900)
                            ->maxValue(now()->year),

                        Select::make('department_id')
                            ->label('Department')
                            ->required()
                            ->options(
                                Department::all()
                                    ->pluck('department_name', 'department_id')
                            )
                            ->searchable()
                            ->live(),

                        Select::make('degree_id')
                            ->label('Degree')
                            ->options(function (Get $get) {
                                $deptId = $get('department_id');
                                if (!$deptId) return [];
                                return Degree::where('department_id', $deptId)
                                    ->pluck('degree_name', 'degree_id');
                            })
                            ->searchable()
                            ->nullable()
                            ->hidden(
                                fn (Get $get) => $get('document_type') === 'Faculty'
                            ),

                        TextInput::make('drive_url')
                            ->label('Google Drive URL')
                            ->url()
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->placeholder('https://drive.google.com/file/d/...'),
                    ]),

                Section::make('Authors & Categories')
                    ->schema([
                        Select::make('authors')
                            ->label('Authors')
                            ->multiple()
                            ->relationship(
                                name: 'authors',
                                titleAttribute: 'last_name',
                            )
                            ->getOptionLabelFromRecordUsing(
                                fn (Author $record) =>
                                    "{$record->last_name}, {$record->first_name}" .
                                    ($record->middle_initial
                                        ? " {$record->middle_initial}."
                                        : '')
                            )
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                TextInput::make('first_name')
                                    ->required(),
                                TextInput::make('last_name')
                                    ->required(),
                                TextInput::make('middle_initial')
                                    ->maxLength(5),
                                TextInput::make('affiliation')
                                    ->default('UP Mindanao'),
                            ]),

                        Select::make('categories')
                            ->label('Categories / Keywords')
                            ->multiple()
                            ->relationship(
                                name: 'categories',
                                titleAttribute: 'category_name',
                            )
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                TextInput::make('category_name')
                                    ->required()
                                    ->maxLength(50),
                                Textarea::make('description')
                                    ->maxLength(255),
                            ]),
                    ]),

            ]);
    }
}