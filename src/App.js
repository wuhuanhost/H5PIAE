import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import _ from "lodash";
import createAbsoluteGrid from "react-absolute-grid";
//简单格子对象
import DragGrid from "./compmnents/DragGrid";

// 设置格子的宽度和高度
const gridWidth = document.body.clientWidth / 3;
const gridHeight = gridWidth;

//创建拖拽排序格子组件
const AbsoluteGrid = createAbsoluteGrid(DragGrid);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleItems: [
                { key: 1, name: "Test 1", sort: 0, filtered: 0 },
                { key: 2, name: "Test 2", sort: 1, filtered: 0 },
                { key: 3, name: "Test 3", sort: 2, filtered: 0 },
                { key: 4, name: "Test 4", sort: 3, filtered: 0 },
                { key: 5, name: "Test 5", sort: 4, filtered: 0 },
                { key: 6, name: "Test 6", sort: 5, filtered: 0 },
                { key: 7, name: "Test 7", sort: 6, filtered: 0 },
                { key: 8, name: "Test 8", sort: 7, filtered: 0 },
                { key: 9, name: "Test 9", sort: 8, filtered: 0 }
            ],
            abc: "拖拽排序"
        };
    }
    handleClick = (source, target) => {
        let sampleItems = arrChangeOfPosition(
            source,
            target,
            this.state.sampleItems
        );
        this.setState({
            sampleItems: sampleItems
        });
    };
    render() {
        //格子组件
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                    {this.state.abc}
                </p>
                <AbsoluteGrid
                    onMove={_.debounce(this.handleClick, 40)} //使用了防抖动函数
                    items={this.state.sampleItems}
                    dragEnabled={true}
                    sortProp={"sort"}
                    itemWidth={gridWidth}
                    itemHeight={gridHeight}
                    responsive={true}
                    verticalMargin={0}
                />
            </div>
        );
    }
}

/**
 * 将sampleItems数组中的第source位置的元素放在target位置，原target位置的元素及其后面的元素统一后移1个位置
 * @param {*} 当前元素
 * @param {*} 交换的元素
 * @param {*} 数组
 */
function arrChangeOfPosition(source, target, sampleItems) {
    source = _.find(sampleItems, { key: parseInt(source, 10) });
    target = _.find(sampleItems, { key: parseInt(target, 10) });

    const targetSort = target.sort; //排序字段

    //CAREFUL, For maximum performance we must maintain the array's order, but change sort
    let newSampleItems = sampleItems.map(function(item) {
        //Decrement sorts between positions when target is greater
        if (item.key === source.key) {
            return {
                ...item,
                sort: targetSort
            };
        } else if (
            target.sort > source.sort &&
            (item.sort <= target.sort && item.sort > source.sort)
        ) {
            return {
                ...item,
                sort: item.sort - 1
            };
            //Increment sorts between positions when source is greater
        } else if (item.sort >= target.sort && item.sort < source.sort) {
            return {
                ...item,
                sort: item.sort + 1
            };
        }
        return item;
    });
    return newSampleItems;
}

export default App;
