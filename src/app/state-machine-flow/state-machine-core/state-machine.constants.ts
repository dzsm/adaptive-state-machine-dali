// DEFAULT NODE IDs
export const NODE_ID_ROOT = 'NODE_ID_ROOT';
export const NODE_ID_DEFAULT = 'NODE_ID_DEFAULT';

// KIND OF NODES (Logical and topological function of nodes)
export const DEFAULT_NODE_BEGIN_KIND = 'BEGIN';
export const DEFAULT_NODE_END_KIND = 'END';
export const DEFAULT_NODE_JUNCTION_KIND = 'JUNCTION';
export const DEFAULT_NODE_TASK_KIND = 'TASK';
export const DEFAULT_NODE_ROUTER_KIND = 'ROUTER';
export const DEFAULT_NODE_ROUTER_FEEDBACK_KIND = 'FEEDBACK';
export const DEFAULT_NODE_DATA_KIND = 'DATA';
export const DEFAULT_NODE_PROCEDURE_KIND = 'PROCEDURE';
export const DEFAULT_NODE_DELAY_KIND = 'DELAY';
export const DEFAULT_NODE_DECISION_KIND = 'DECISION';
export const DEFAULT_NODE_ERROR_KIND = 'ERROR';
export const DEFAULT_NODE_TIME_KIND = 'TIME';

// PORTS (port types for each kind of nodes)
export const DEFAULT_NODE_PORT_IN = 'IN';
export const DEFAULT_NODE_PORT_OUT = 'OUT';
export const DEFAULT_NODE_ERROR_PORT_TRY = 'TRY';
export const DEFAULT_NODE_ERROR_PORT_CATCH = 'CATCH';
export const DEFAULT_NODE_TIME_PORT_OUT = 'OUT';
export const DEFAULT_NODE_TIME_PORT_TIMEOUT = 'TIMEOUT';
export const DEFAULT_NODE_DECISION_PORT_TRUE = 'TRUE';
export const DEFAULT_NODE_DECISION_PORT_FALSE = 'FALSE';
export const DEFAULT_NODE_ROUTER_PORT_ELSE = 'ELSE';

// DISTINCT BASEIC SHAPES AND COLORS
export const NODE_SHAPE_ELLIPSE = 'ELLIPSE';
export const NODE_SHAPE_FLATELLIPSE = 'FLATELLIPSE';
export const NODE_SHAPE_RECTANGLE = 'RECTANGLE';
export const NODE_SHAPE_ROUNDEDRECTANGLE = 'ROUNDEDRECTANGLE';
export const NODE_SHAPE_PARALLELOGRAM = 'PARALLELOGRAM';
export const NODE_SHAPE_TRAPEZOID = 'TRAPEZOID';
export const NODE_SHAPE_DIAMOND = 'DIAMOND';
export const NODE_SHAPE_HEXAGON = 'HEXAGON';
export const NODE_SHAPE_OCTAGON = 'OCTAGON';
export const NODE_SHAPE_OCTAGONHORIZONTAL = 'OCTAGONHORIZONTAL';

export const NODE_COLOR_RED = '#e6194b';
export const NODE_COLOR_GREEN = '#3cb44b';
export const NODE_COLOR_YELLOW = '#ffe119';
export const NODE_COLOR_BLUE = '#0082c8';
export const NODE_COLOR_ORANGE = '#f58231';
export const NODE_COLOR_PURPLE = '#911eb4';
export const NODE_COLOR_CYAN = '#46f0f0';
export const NODE_COLOR_MAGENTA = '#f032e6';
export const NODE_COLOR_LIME = '#d2f53c';
export const NODE_COLOR_PINK = '#fabebe';
export const NODE_COLOR_TEAL = '#008080';
export const NODE_COLOR_LAVENDER = '#e6beff';
export const NODE_COLOR_BROWN = '#aa6e28';
export const NODE_COLOR_BEIGE = '#fffac8';
export const NODE_COLOR_MAROON = '#800000';
export const NODE_COLOR_MINT = '#aaffc3';
export const NODE_COLOR_OLIVE = '#808000';
export const NODE_COLOR_CORAL = '#ffd8b1';
export const NODE_COLOR_NAVY = '#000080';
export const NODE_COLOR_GREY = '#808080';
export const NODE_COLOR_WHITE = '#FFFFFF';
export const NODE_COLOR_BLACK = '#000000';

// CATEGORIES (Visual represantation parameters of each kind - for a kind can be more visual representation - eg horizontal or vertical DECISION)
// Any visual representation should contain templates to these categories
export const DEFAULT_NODE_BEGIN_CATEGORY_1 = {
    category: 'BEGIN_1',
    kind: DEFAULT_NODE_BEGIN_KIND,
    shape: NODE_SHAPE_ELLIPSE,
    color: NODE_COLOR_GREY,
    width: 70,
    height: 50,
    top: null,
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_END_CATEGORY_1 = {
    category: 'END_1',
    kind: DEFAULT_NODE_END_KIND,
    shape: NODE_SHAPE_ELLIPSE,
    color: NODE_COLOR_GREY,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: null,
    left: null,
    right: null
};
export const DEFAULT_NODE_JUNCTION_CATEGORY_1 = {
    category: 'JUNCTION_1',
    kind: DEFAULT_NODE_JUNCTION_KIND,
    shape: NODE_SHAPE_ELLIPSE,
    color: NODE_COLOR_GREY,
    width: 30,
    height: 30,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: -1},
    left: null,
    right: null
};
export const DEFAULT_NODE_TASK_CATEGORY_1 = {
    category: 'TASK_1',
    kind: DEFAULT_NODE_TASK_KIND,
    shape: NODE_SHAPE_ROUNDEDRECTANGLE,
    color: NODE_COLOR_GREEN,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_ROUTER_CATEGORY_1 = {
    category: 'ROUTER_1',
    kind: DEFAULT_NODE_ROUTER_KIND,
    shape: NODE_SHAPE_OCTAGON,
    color: NODE_COLOR_ORANGE,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: -1},
    left: null,
    right: {port: DEFAULT_NODE_ROUTER_PORT_ELSE, input: 0, output: 1}
};
export const DEFAULT_NODE_ROUTER_FEEDBACK_CATEGORY_1 = {
    category: 'FEEDBACK_1',
    kind: DEFAULT_NODE_ROUTER_FEEDBACK_KIND,
    shape: NODE_SHAPE_RECTANGLE,
    color: NODE_COLOR_ORANGE,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_DATA_CATEGORY_1 = {
    category: 'DATA_1',
    kind: DEFAULT_NODE_DATA_KIND,
    shape: NODE_SHAPE_PARALLELOGRAM,
    color: NODE_COLOR_TEAL,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_PROCEDURE_CATEGORY_1 = {
    category: 'PROCEDURE_1',
    kind: DEFAULT_NODE_PROCEDURE_KIND,
    shape: NODE_SHAPE_ELLIPSE,
    color: NODE_COLOR_TEAL,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_DELAY_CATEGORY_1 = {
    category: 'DELAY_1',
    kind: DEFAULT_NODE_DELAY_KIND,
    shape: NODE_SHAPE_PARALLELOGRAM,
    color: NODE_COLOR_TEAL,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_PORT_OUT, input: 0, output: 1},
    left: null,
    right: null
};
export const DEFAULT_NODE_DECISION_CATEGORY_1 = {
    category: 'DECISION_1',
    kind: DEFAULT_NODE_DECISION_KIND,
    shape: NODE_SHAPE_DIAMOND,
    color: NODE_COLOR_TEAL,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_DECISION_PORT_TRUE, input: 0, output: 1},
    left: null,
    right: {port: DEFAULT_NODE_DECISION_PORT_FALSE, input: 0, output: 1},
};
export const DEFAULT_NODE_DECISION_CATEGORY_2 = {
    category: 'DECISION_2',
    kind: DEFAULT_NODE_DECISION_KIND,
    shape: NODE_SHAPE_DIAMOND,
    color: NODE_COLOR_TEAL,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: null,
    left: {port: DEFAULT_NODE_DECISION_PORT_FALSE, input: 0, output: 1},
    right: {port: DEFAULT_NODE_DECISION_PORT_TRUE, input: 0, output: 1},
};
export const DEFAULT_NODE_ERROR_CATEGORY_1 = {
    category: 'ERROR_1',
    kind: DEFAULT_NODE_ERROR_KIND,
    shape: NODE_SHAPE_HEXAGON,
    color: NODE_COLOR_RED,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_ERROR_PORT_TRY, input: 0, output: 1},
    left: null,
    right: {port: DEFAULT_NODE_ERROR_PORT_CATCH, input: 0, output: 1},
};
export const DEFAULT_NODE_TIME_CATEGORY_1 = {
    category: 'TIME_1',
    kind: DEFAULT_NODE_TIME_KIND,
    shape: NODE_SHAPE_HEXAGON,
    color: NODE_COLOR_YELLOW,
    width: 70,
    height: 50,
    top: {port: DEFAULT_NODE_PORT_IN, input: -1, output: 0},
    bottom: {port: DEFAULT_NODE_TIME_PORT_OUT, input: 0, output: 1},
    left: null,
    right: {port: DEFAULT_NODE_TIME_PORT_TIMEOUT, input: 0, output: 1},
};

export const CATEGORY_LIST = [
    DEFAULT_NODE_BEGIN_CATEGORY_1,
    DEFAULT_NODE_END_CATEGORY_1,
    DEFAULT_NODE_JUNCTION_CATEGORY_1,
    DEFAULT_NODE_TASK_CATEGORY_1,
    DEFAULT_NODE_ROUTER_CATEGORY_1,
    DEFAULT_NODE_ROUTER_FEEDBACK_CATEGORY_1,
    DEFAULT_NODE_DATA_CATEGORY_1,
    DEFAULT_NODE_PROCEDURE_CATEGORY_1,
    DEFAULT_NODE_DELAY_CATEGORY_1,
    DEFAULT_NODE_DECISION_CATEGORY_1,
    DEFAULT_NODE_DECISION_CATEGORY_2,
    DEFAULT_NODE_ERROR_CATEGORY_1,
    DEFAULT_NODE_TIME_CATEGORY_1
];


