import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {StateMachineService} from '../../state-machine';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {NgxDiagramComponent} from 'ngx-diagram';

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

    fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;


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
            this.openAddFileDialog();
            //  this.graphEditorService.addEdge({id: id(), from: connection.source.id, to: connection.target.id});
        }
    }

    created(creation) {
        // this.graphEditorService.addNode({id: id()}, creation.x, creation.y);
    }

    openAddFileDialog() {
        this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent, {
            hasBackdrop: false
        });

        this.fileNameDialogRef
            .afterClosed()
            .pipe(filter(name => name))
            .subscribe(name => {
            });
    }

}

@Component({
    template: `
    <h1 mat-dialog-title>Add file</h1>
    <mat-dialog-content>
      Content goes here
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="submit('ADD')">Add</button>
      <button mat-button (click)="submit('CANCEL')">Cancel</button>
    </mat-dialog-actions>
  `
})
export class FileNameDialogComponent implements OnInit {

    constructor(private dialogRef: MatDialogRef<FileNameDialogComponent>) {
    }

    ngOnInit() {
    }

    submit(form) {
        this.dialogRef.close(form);
    }

}
