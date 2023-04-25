/**
 * 常量定义
 */
const NormalFontSize = '16';
const EmphasisFontSize = '20';

/**
 * 柱状图和折线图数据类型。
 */
class BarLineData {
    data: number[]; // 数据，是一个数组
    name: string = ''; // 指标名称，是一个字符串
    type: string = 'bar'; // 指标表现类型，默认为bar-柱状图

    constructor(data: number[], name: string, type?: string) {
        this.data = data;
        this.name = name;
        this.type = type || 'bar';
    }
}

/**
 * 饼状图数据类型。
 */
class PieData {
    name: string; // 指标名称，是一个字符串
    value: number; // 指标值，是一个数字

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
}

/**
 * 基类。提供基本属性设置与保存。
 */
class ChartBuilder {
    protected _type: string; // 图表类型。可以为：bar, line, pie三种
    protected _title: string; // 图表名称

    public constructor() {
        this._type = '';
        this._title = '';
    }

    public title(title: string) {
        this._title = title;
        return this;
    }
}

class BarLineBuilder extends ChartBuilder {
    protected _xAxis: Object = {}; // x轴坐标
    protected _yAxis: Object = {}; // y轴坐标
    protected _allData: BarLineData[] = []; // 数据
    protected _area: boolean = false; // 折线图下是否以area形式展示
    protected _position: string = 'top'; // 默认tooltip未知top

    public constructor() {
        super();
        this._type = 'bar';
    }

    /**
     * 设置X轴坐标
     * @param data x轴坐标。数据格式：['坐标1', '坐标2', ...]
     */
    public xAxis(axis: Object) {
        this._xAxis = axis;
        return this;
    }

    public yAxis(axis: Object) {
        this._yAxis = axis;
        return this;
    }

    /**
     * 设置x轴数据
     * @param data 数据。为一个数字数组
     * @param name 指标的名称。为字符串
     * @param type 可选的类型。字符串。可选值为line, bar
     */
    public x(data: number[], name: string, type?: 'line'|'bar') {
        this._allData.push(new BarLineData(data, name, type || this._type));
        this._position = 'top';
        return this;
    }

    public y(data: number[], name: string, type?: string) {
        this._allData.push(new BarLineData(data, name, type || this._type));
        this._position = 'right';
        return this;
    }

    public build() {
        let series = [];
        let legend = [];
        for (let data of this._allData) {
            let serieData: any = {
                name: data.name,
                type: data.type,
                data: data.data,
                // stack: '总量',
                // itemStyle: { normal: { label: { show: true, , textStyel: { fontSize: NormalFontSize } } } },
                label: { show: true, position: this._position },
                emphasis: { show: true, textStyle: { fontSize: EmphasisFontSize, fontWeight: 'bold' } }
            };
            if (this._area) {
                serieData.areaStyle = {};
            }
            series.push(serieData);
            legend.push(data.name);
        }
        let option = {
            title: { text: this._title },
            tooltip: { show: true, trigger: 'axis', formatter: '{a} <br/>{b}: {c}', axisPointer: { type: 'shadow' } },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
                    },
                    dataView: {},
                    saveAsImage: { pixelRatio: 4 }
                }
            },
            legend: { top: 'bottom', data: legend },
            xAxis: this._xAxis,
            yAxis: this._yAxis,
            series: series,
            builder: this
        };
        return option;
    }
}

class BarBuilder extends BarLineBuilder {
    public constructor() {
        super();
        this._type = 'bar';
    }
}

class LineBuilder extends BarLineBuilder {
    public constructor() {
        super();
        this._type = 'line';
    }

    public area() {
        this._area = true;
        return this;
    }
}

class PieBuilder extends ChartBuilder {
    protected _allData: PieData[] = []; // 数据
    protected _doughnut: boolean = false; // 是否显示成甜甜圈形状
    protected _rose: boolean = false; // 是否显示成南丁格尔玫瑰形状

    constructor() {
        super();
        this._type = 'pie';
    }

    public data(name: string, value: number) {
        this._allData.push(new PieData(name, value));
        return this;
    }

    /**
     * 圆环状。Doughnut Chart
     */
    public doughnut() {
        this._doughnut = true;
        this._rose = false;
        return this;
    }

    /**
     * 南丁格尔玫瑰图
     */
    public rose() {
        this._doughnut = false;
        this._rose = true;
        return this;
    }

    public build() {
        let legend: string[] = [];
        for (let data of this._allData) {
            legend.push(data.name);
        }

        let option = {
            title: { text: this._title },
            tooltip: { trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
            legend: { top: 'bottom', data: legend },
            toolbox: {
                show: true,
                feature: {
                    dataView: {},
                    saveAsImage: { pixelRatio: 4 }
                }
            },
            series: {
                roseType: this._rose ? 'radius' : '',
                type: this._type,
                backgroundColor: '#eee',
                name: this._title,
                selectedMode: 'single',
                radius: this._doughnut ? ['45%', '70%'] : '70%',
                avoidLabelOverlap: true,
                // itemStyle: { normal: { label: { show: true, position: 'outside', formatter: '{a}' } } },
                label: { formatter: '{b}\n{d}%', emphasis: { textStyle: { fontSize: EmphasisFontSize, fontWeight: 'bold' } } },
                data: this._allData
            },
            builder: this
        };
        return option;
    }
}

class AxisBuilder {
    protected _type: string = 'value'; // value, category, time, log
    protected _name: string = ''; // 坐标轴名称
    protected _min: number = 0; // 最小值。用于value类型。
    protected _max: number = 0; // 最大值。用于value类型。
    protected _scale = false; // 是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。
    protected _formatter: string ='';
    protected _data: string[] = [];

    public name(name: string) {
        this._name = name;
        return this;
    }

    public formatter(formatter: string) {
        this._formatter = formatter;
        return this;
    }
}

class ValueAxisBuilder extends AxisBuilder {
    constructor() {
        super();
        this._type = 'value';
    }

    public min(min: number) {
        this._min = min;
        return this;
    }

    public max(max: number) {
        this._max = max;
        return this;
    }

    public scale() {
        this._scale = true;
        return this;
    }

    public build() {
        let option: any = { type: this._type, min: this._min, max: this._max, scale: this._scale };
        return option;
    }
}

class CategoryAxisBuilder extends AxisBuilder {
    constructor() {
        super();
        this._type = 'category';
    }

    public data(data: string[]) {
        this._data = data;
        return this;
    }

    public build() {
        let option: any = { type: this._type, data: this._data };
        if (option._name) option.name = this._name;

        return option;
    }
}

/**
 * 返回bar类型的构建器
 */
export function bar(): BarBuilder {
    return new BarBuilder();
}

/**
 * 返回pie类型的构建器
 */
export function pie(): PieBuilder {
    return new PieBuilder();
}

/**
 * 返回line类型的构建器
 */
export function line(): LineBuilder {
    return new LineBuilder();
}

/**
 * 返回坐标轴的构建器
 */
export function valueAxis(): ValueAxisBuilder {
    return new ValueAxisBuilder();
}

export function categoryAxis(): CategoryAxisBuilder {
    return new CategoryAxisBuilder();
}
