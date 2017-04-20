import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Category, CategoryService } from './../../categories';
import { Publication } from './../';
import { PublicationService } from './../publication.service';

@Component({
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {
    @Input() category: Category;
    publications: Publication[];
    selectedPublication: Publication;

    constructor(
        private publicationService: PublicationService,
        private route: ActivatedRoute,
        private router: Router){ }

    ngOnInit(): void {
        this.getPublications();
    }

    getPublications(): void {
        this.route.params
            .switchMap((params: Params) => this.publicationService.
                                            getPublicationsByCategory(params['slug']))
            .subscribe((publications: Publication[]) => this.publications = publications);
    }

    onSelect(publication: Publication): void {
        this.selectedPublication = publication;
    }

    deSelect(): void {
        this.selectedPublication = null;
    }

}