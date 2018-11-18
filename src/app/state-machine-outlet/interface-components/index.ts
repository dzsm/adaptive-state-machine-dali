import {DialogInterfaceComponentComponent} from './dialog-interface-component/dialog-interface-component.component';

export const INTERFACE_COMPONENT_LIST = [DialogInterfaceComponentComponent];
export const INTERFACE_COMPONENT_MAP = {};
INTERFACE_COMPONENT_LIST.forEach(component => INTERFACE_COMPONENT_MAP[component.nodeInterfaceRef] = component);
