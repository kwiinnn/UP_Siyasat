<?php

namespace App\Filament\Widgets;

use App\Models\ResearchDocument;
use App\Models\Author;
use App\Models\Category;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make(
                'Total Documents',
                ResearchDocument::count()
            )
                ->description('All research documents in the repository')
                ->color('primary'),

            Stat::make(
                'Undergraduate Theses',
                ResearchDocument::where('document_type', 'Undergraduate')->count()
            )
                ->description('Undergraduate research papers')
                ->color('info'),

            Stat::make(
                'Postgraduate Theses',
                ResearchDocument::where('document_type', 'Postgraduate')->count()
            )
                ->description('Postgraduate research papers')
                ->color('success'),

            Stat::make(
                'Faculty Research',
                ResearchDocument::where('document_type', 'Faculty')->count()
            )
                ->description('Faculty research papers')
                ->color('warning'),

            Stat::make(
                'Total Authors',
                Author::count()
            )
                ->description('Registered authors in the system')
                ->color('gray'),

            Stat::make(
                'Total Categories',
                Category::count()
            )
                ->description('Research categories and keywords')
                ->color('gray'),
        ];
    }
}