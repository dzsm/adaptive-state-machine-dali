import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {StateMachineService} from '../../state-machine';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {NgxDiagramComponent} from 'ngx-diagram';
import * as Constants from '../../state-machine-flow/state-machine-core/state-machine.constants';
import * as Constants2 from '../../state-machine-flow/state-machine-core/state-machine.nodes';

@Component({
    selector: 'app-state-machine-graph',
    templateUrl: './state-machine-graph.component.html',
    styleUrls: ['./state-machine-graph.component.css']
})
export class StateMachineGraphComponent implements OnInit {
    @ViewChild('diagram') diagram: NgxDiagramComponent;
    selection = [];

    nodes: Array<any> = [];
    edges: Array<any> = [];

    cursor: string;
    selected: string;
    focused: string;

    selectedNode: any;
    focusedNode: any;

    addConnectionDialogRef: MatDialogRef<AddConnectionDialogComponent>;
    addNodeDialogRef: MatDialogRef<AddNodeDialogComponent>;

    constructor(public stateMachineService: StateMachineService, private dialog: MatDialog, private _ngZone: NgZone) {
    }

    ngOnInit() {

        this.stateMachineService.edges$.subscribe(edges => {
            this._ngZone.run(() => {
                this.diagram.updateLinks(edges.map(edge => ({source: edge.from, target: edge.to})));
            });
        });

        this.stateMachineService.nodes$.subscribe(nodes => {
            this._ngZone.run(() => {
                this.diagram.updateNodes(nodes);
                // this.graphEditorService.updateNodes(nodes);
                // this.nodes = nodes;
            });
        });


        this.stateMachineService.state$.subscribe(state => {
            this._ngZone.run(() => {
                this.cursor = state.processor.cursor;
            });
        });


    }


    connected(connection) {
        if (connection.source.id !== connection.target.id) {
            this.addConnectionDialog(connection);
            //  this.graphEditorService.addEdge({id: id(), from: connection.source.id, to: connection.target.id});
        }
    }

    created(creation) {
        this.addNodeDialog(creation);
        // this.graphEditorService.addNode({id: id()}, creation.x, creation.y);
    }

    addConnectionDialog(data: any) {

        this.addConnectionDialogRef = this.dialog.open(AddConnectionDialogComponent, {
            hasBackdrop: false,
            data: data
        });

        this.addConnectionDialogRef
            .afterClosed()
            .pipe(filter(name => name))
            .subscribe(name => {
                console.log(name);
            });
    }

    addNodeDialog(data: any) {

        this.addNodeDialogRef = this.dialog.open(AddNodeDialogComponent, {
            hasBackdrop: false,
            data: data
        });

        this.addNodeDialogRef
            .afterClosed()
            .pipe(filter(name => name))
            .subscribe(name => {
                console.log(name);
            });
    }
}

@Component({
    template: `
        <h1 mat-dialog-title>Add Connection</h1>
        <mat-dialog-content>

            <div fxLayout="row" fxLayoutAlign="center center">
                <app-node [node]="data.source"></app-node>
                <strong>=></strong>
                <app-node [node]="data.target"></app-node>
            </div>
            <!--
                        <mat-card fxFlex="50%" [style.padding.px]="0" [style.margin.px]="5">
                            <mat-card-header [style.background]="'lightGrey'" [style.padding.px]="10" [style.margin.px]="0">
                                <mat-card-title-group>
                                    <mat-card-title [style.margin.px]="5"><strong>{{data.source?.type}}</strong></mat-card-title>
                                    <mat-card-subtitle [style.margin.px]="5">{{data.source?.id}}</mat-card-subtitle>
                                </mat-card-title-group>
                                <div fxFlex></div>
                                <button mat-icon-button [matMenuTriggerFor]="menu">
                                    <mat-icon>more_vert</mat-icon>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item disabled="!help">
                                        <mat-icon>help</mat-icon>
                                        <span>Help</span>
                                    </button>
                                </mat-menu>
            
                            </mat-card-header>
            
                            <mat-card-content>
                                <mat-grid-list cols="4" [rowHeight]="50">
                                    <mat-grid-tile [colspan]="4" [rowspan]="2">
                          <pre [style.width.%]="100" [style.height.%]="100" [style.padding.px]="5" [style.background]="'black'"
                               [style.color]="'white'" [style.overflow]="'auto'">{{data.source?.data | json}}</pre>
                                    </mat-grid-tile>
                                    <mat-grid-tile [colspan]="2" [rowspan]="1" [style.background]="'lightGrey'">
                                        {{data.source?.input || '-'}}
                                    </mat-grid-tile>
                                    <mat-grid-tile [colspan]="2" [rowspan]="1" [style.background]="'lightGrey'">
                                        {{data.source?.output || '-'}}
                                    </mat-grid-tile>
                                </mat-grid-list>
                            </mat-card-content>
                        </mat-card>
                        <mat-card fxFlex="50%"  [style.padding.px]="0"
                                  [style.margin.px]="5">
                            <mat-card-header [style.background]="'lightGrey'" [style.padding.px]="10" [style.margin.px]="0">
                                <mat-card-title-group>
                                    <mat-card-title [style.margin.px]="5"><strong>{{data.target?.type}}</strong></mat-card-title>
                                    <mat-card-subtitle [style.margin.px]="5">{{data.target?.id}}</mat-card-subtitle>
                                </mat-card-title-group>
                                <div fxFlex></div>
                                <button mat-icon-button [matMenuTriggerFor]="menu">
                                    <mat-icon>more_vert</mat-icon>
                                </button>
                                <mat-menu #menu="matMenu">
                                    <button mat-menu-item disabled="!help">
                                        <mat-icon>help</mat-icon>
                                        <span>Help</span>
                                    </button>
                                </mat-menu>
            
                            </mat-card-header>
            
                            <mat-divider></mat-divider>
                            <mat-card-content>
                                <mat-grid-list cols="4" [rowHeight]="50">
                                    <mat-grid-tile [colspan]="4" [rowspan]="2">
                          <pre [style.width.%]="100" [style.height.%]="100" [style.padding.px]="5" [style.background]="'black'"
                               [style.color]="'white'" [style.overflow]="'auto'">{{data.target?.data | json}}</pre>
                                    </mat-grid-tile>
                                    <mat-grid-tile [colspan]="2" [rowspan]="1" [style.background]="'lightGrey'">
                                        {{data.target?.input || '-'}}
                                    </mat-grid-tile>
                                    <mat-grid-tile [colspan]="2" [rowspan]="1" [style.background]="'lightGrey'">
                                        {{data.target?.output || '-'}}
                                    </mat-grid-tile>
                                </mat-grid-list>
                            </mat-card-content>
                        </mat-card>
            -->

        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="submit('ADD')">Add Connection</button>
            <button mat-button (click)="submit('CANCEL')">Cancel</button>
        </mat-dialog-actions>
    `
})
export class AddConnectionDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<AddConnectionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    submit(form) {
        this.dialogRef.close(form);
    }

}

@Component({
    template: `
        <h1 mat-dialog-title>Add Node</h1>
        <mat-dialog-content>

            <form class="example-form">
                <mat-form-field class="example-full-width">
                    <input matInput placeholder="Company (disabled)" disabled value="Google">
                </mat-form-field>

                <select required [(ngModel)]="selectedNodeType"> <!-- <== changed -->
                    <option *ngFor="let nodeClass of constants2.NODE_CLASS_LIST" [ngValue]="nodeClass.nodeType">{{ nodeClass.nodeType }}
                    </option>
                </select>
                
                <div *ngFor="let form of constants2.TYPE_TO_NODE_CLASS_MAP[selectedNodeType].nodeForm">
                    {{form.field}}
                    <select *ngIf="form.field=='data'" required [(ngModel)]="forms.type">
                        <option *ngFor="let x of form.options" [ngValue]="x">{{ x }}</option>
                    </select>
                    <input type="text" [(ngModel)]="forms.data" *ngIf="form.field=='data'">
                    <input type="text" [(ngModel)]="forms.output" *ngIf="form.field=='output'">
                    <input type="text" [(ngModel)]="forms.input" *ngIf="form.field=='input'">

                </div>

            </form>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="submit('ADD')">Add Node</button>
            <button mat-button (click)="submit('CANCEL')">Cancel</button>
        </mat-dialog-actions>
    `
})
export class AddNodeDialogComponent implements OnInit {


    forms = {
        type: null,
        output: null,
        input: null,
        data: null,
    };

    selectedNodeType: string = 'ROOT';

    get constants() {
        return Constants;
    }

    get constants2() {
        return Constants2;
    }

    constructor(private dialogRef: MatDialogRef<AddNodeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    submit(form) {
        this.dialogRef.close(form);
    }

}
