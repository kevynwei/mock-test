import React, { Component } from 'react';
import './App.css';
import JobTree from './jobtree/jobtree';

const JOBS = [
  { name: "工程研发部门", key: "0", children: [
    { key: "0-0", name: "Mac 开发工程师", number: 9, checked: false },
    { key: "0-1", name: "iOS App 测试工程师", number: 17, checked: false },
    { key: "0-2", name: "Android 远程控制工程师", number: 61, checked: false },
    { key: "0-3", name: "Web 前端工程师", number: 31, checked: false },
    { key: "0-4", name: "Android 多媒体软件开发工程师", number: 2, checked: false }
  ]},
  { name: "产品设计部门", key: "1", children: [
    { key: "1-1", name: "网页设计师", number: 47, checked: false },
    { key: "1-2", name: "ID/工业设计师", number: 39, checked: false },
    { key: "1-3", name: "视觉设计师/GUI界面设计师", number: 42, checked: false },
    { key: "1-4", name: "平面设计师", number: 8, checked: false },
  ]}
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="side">
          <JobTree jobs={JOBS} />
        </div> 
      </div>
    );
  }
}

export default App;
