import React, { Component } from "react";
import './jobtree.css';

// 招聘组件 - 通用复选框
class JobCheckbox extends Component {
  render() {
    let checkState = 'default';

    return (
      <div className={'checkbox ' + checkState}>
        <input type="checkbox" />
      </div>
    );
  }
}

// 招聘组件 - 部门 - 头部
class JobTreeDepartHeader extends Component {
  render() {
    const name = this.props.name;

    return (
      <div className="depart-header sub-color">
        <JobCheckbox /> 
        <span className="name">{name}</span>
        <span className="number">0</span>
      </div>
    );
  }
}

// 招聘组件 - 部门 - 职位列表
class JobTreeItem extends Component {
  render() {
    const { name, number, checked } = this.props.job;

    return (
      <li>
        <JobCheckbox />
        <span>{name}</span>
        <span className="number">{number}</span>
      </li>
    );
  }
}

// 招聘组件 - 部门
class JobTreeDepartment extends Component {
  state = {
    department: this.props.departJobs
  }

  render() {
    const { name, children } = this.state.department;
    const items = children.map( job => (
      <JobTreeItem key={job.key} job={job} />
    ));

    return (
      <div className="department">
        <JobTreeDepartHeader name={name} />
        <ul>{items}</ul>
      </div>
    )
  }
}


// 招聘组件 - 主体
class JobTreeBody extends Component {
  state = {
    jobs: this.props.jobs
  }
  
  render() {
    const departments = [],
      jobs = this.state.jobs;

    jobs.forEach(department => {
      departments.push(
        <JobTreeDepartment departJobs={department} />
      );
    });

   return (
    <div className="body">
      {departments}
    </div>
   );
  }
}


// 招聘组件 - 头部
class JobTreeHeader extends Component {
  render() {
    return (
      <header>
        <h2>招聘职位</h2>
        <div className="btn sub-color">清空</div>
      </header>
    )
  }
}


// 招聘组件
class JobTree extends Component {
  render() {
    return (
      <div className="jobtree">
        <JobTreeHeader />
        <JobTreeBody jobs={this.props.jobs} />
      </div>
    );
  }
}

export default JobTree;