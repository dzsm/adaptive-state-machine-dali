import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {INode, StateMachineService} from '../../state-machine';
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
            .pipe(filter(connectionData => connectionData !== null))
            .subscribe(connectionData => {
                this.stateMachineService.programControl.addEdge(connectionData.source.id, connectionData.target.id).then(id => {
                    this.diagram.redraw();
                });
                console.log(connectionData);
            });
    }

    addNodeDialog(data: any) {

        this.addNodeDialogRef = this.dialog.open(AddNodeDialogComponent, {
            hasBackdrop: false,
            data: data
        });

        this.addNodeDialogRef
            .afterClosed()
            .pipe(filter(nodeData => nodeData !== null))
            .subscribe(nodeData => {
                this.stateMachineService.programControl.addNode(nodeData.type, nodeData.data, nodeData.input, nodeData.output).then(id => {
                    this.diagram.addNodeTo({id}, nodeData.position.x, nodeData.position.y);
                    this.diagram.redraw();
                });
                console.log(nodeData);
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

        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="submitAddConnection()">Add Connection</button>
            <button mat-button (click)="submitCancel()">Cancel</button>
        </mat-dialog-actions>
    `
})
export class AddConnectionDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<AddConnectionDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    submitAddConnection() {
        this.dialogRef.close(this.data);
    }

    submitCancel() {
        this.dialogRef.close(null);
    }

}

@Component({
    template: `
        <h1 mat-dialog-title>Add Node</h1>
        <mat-dialog-content>

            <mat-form-field style="width: 100%;">
                <mat-select required placeholder="Node Type" [(ngModel)]="selectedNodeType">
                    <mat-option *ngFor="let nodeClass of constants2.NODE_CLASS_LIST" [value]="nodeClass.nodeType">
                        {{ nodeClass.nodeType }} ( {{nodeClass.nodeKind}} )
                    </mat-option>
                </mat-select>
            </mat-form-field>

            <div *ngFor="let form of constants2.TYPE_TO_NODE_CLASS_MAP[selectedNodeType].nodeForm">

                <mat-form-field style="width: 100%;" *ngIf="form.field=='data'">
                    <mat-select required placeholder="Data Type" [(ngModel)]="forms.type">
                        <mat-option *ngFor="let x of form.options" [value]="x">{{ x }}</mat-option>
                    </mat-select>
                </mat-form-field>

                <mat-form-field style="width: 100%;" *ngIf="form.field=='data'">
                    <input matInput type="text" placeholder="Data" [(ngModel)]="forms.data">
                </mat-form-field>

                <mat-form-field style="width: 100%;" *ngIf="form.field=='output'">
                    <input matInput type="text" placeholder="Output Register" [(ngModel)]="forms.output">
                </mat-form-field>

                <mat-form-field style="width: 100%;" *ngIf="form.field=='input'">
                    <input matInput type="text" placeholder="Input Register" [(ngModel)]="forms.input">
                </mat-form-field>

            </div>

        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button (click)="submitAddNode()">Add Node</button>
            <button mat-button (click)="submitCancel()">Cancel</button>
        </mat-dialog-actions>
    `
})
export class AddNodeDialogComponent implements OnInit {


    forms = {
        output: null,
        input: null,
        type: null,
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

    submitAddNode() {
        const node = {
            id: null,
            data: this.forms.data,
            input: this.forms.input,
            output: this.forms.output,
            type: this.selectedNodeType,
            position: this.data
        };
        this.dialogRef.close(node);
    }

    submitCancel() {
        this.dialogRef.close(null);
    }


}
