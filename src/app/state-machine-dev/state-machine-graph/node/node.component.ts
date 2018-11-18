import {Component, Input, OnInit} from '@angular/core';
import {INode} from '../../../state-machine-flow';

@Component({
    selector: 'app-node',
    templateUrl: './node.component.html',
    styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

    @Input() node: INode;

    constructor() {
    }

    ngOnInit() {
    }

}
