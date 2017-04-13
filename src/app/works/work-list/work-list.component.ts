import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category, CategoryService } from './../../categories';
import { Work } from './../';
import { WorkService } from './../work.service';

@Component({
    selector: 'work-list',
    templateUrl: './work-list.component.html',
    styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {
    works: Work[];
    categories: Category[];
    selectedCategory: Category;
    selectedWork: Work;

    constructor(
        private workService: WorkService,
        private categoryService: CategoryService,
        private router: Router){ }

    getCategories(): void {
        this.categoryService
            .getWorkCategories()
            .then(categories => this.categories = categories)
    }

    getWorks(): void {
        this.workService
            .getWorks()
            .then(works => this.works = works)
    }

    ngOnInit(): void {
        this.getCategories();
    }

    onSelect(category: Category): void {
        this.selectedCategory = category;
    }

    gotoCategory(): void {
        this.router.navigate(['/works/categories/', this.selectedCategory.name])
    }
    
}