import React, { Component } from "react";
import './jobtree.css';


// 招聘组件 - 通用复选框
class JobCheckbox extends Component {
  render() {
    return (
      <div className={'checkbox ' + this.props.checkState}
        onClick={this.props.clickChange}
      >
        <div></div>
      </div>
    );
  }
}


// 招聘组件 - 部门 - 头部
class JobTreeDepartHeader extends Component {
  render() {
    const { name, checkState, total } = this.props;
    return (
      <div className="depart-header sub-color">
        <JobCheckbox 
          clickChange={this.props.checkboxClick}
          checkState={checkState}
        /> 
        <span className="name">{name}</span>
        <span className="icon"></span>
        <span className="number">{total}</span>
      </div>
    );
  }
}


// 招聘组件 - 部门 - 职位列表项
class JobTreeItem extends Component {
  render() {
    const { name, number } = this.props.job;
    const checkState = this.props.checkState || 'null';
    return (
      <li>
        <JobCheckbox 
          clickChange={this.props.checkboxClick}
          checkState={checkState}
        />
        <span>{name}</span>
        <span className="number">{number}</span>
      </li>
    );
  }
}


// 招聘组件 - 部门
class JobTreeDepartment extends Component {
  state = {
    department: Object.assign({}, this.props.departJobs),
    departmentCheckState: null
  }

  componentDidMount = () => {
    this.setState({
      departmentCheckState: this.setDepartCheckboxState(this.state.department.children)
    })
  }

  // 单击职位头部复选框触发事件
  headerCheckboxChange = (clearCmd) => {
    let listChecked;
    if(clearCmd && clearCmd === 'clear') {
      listChecked = false;
    } else {
      let departmentCheckState = this.state.departmentCheckState;
      switch (departmentCheckState) {
        case 'all':
          listChecked = false;
          break;
        case 'part':
        case 'null':
        default:
          listChecked = true;
      }
    }

    this.setState((prevState) => {
      const nextState = {...prevState};
      const children = nextState.department.children;
      children.forEach( item => {
        item.checked = listChecked;
      });
      nextState.departmentCheckState = this.setDepartCheckboxState(children);
      return nextState;
    });
  }

  // 单击职位列表项的复选框时触发的事件
  listCheckboxChange = (key) => {
    const items = this.state.department.children;
    const idx = items.findIndex( item => {
      return item.key === key;
    });
    this.setState(( prevState ) => {
      const nextState = {...prevState};
      const nextChildren = nextState.department.children;
      nextChildren[idx].checked = !prevState.department.children[idx].checked;
      nextState.departmentCheckState = this.setDepartCheckboxState(nextChildren);
      return nextState;
    })
  }

  // 设置部门复选框选中状态
  setDepartCheckboxState = (items) => {
    let departmentCheckState;
    if (items.every( job => {
      return job.checked;
    })) {
      departmentCheckState = 'all';
    } else if (items.every( job => {
      return !job.checked;
    })) {
      departmentCheckState = 'null';
    } else {
      departmentCheckState = 'part';
    }
    return departmentCheckState;
  }

  // 清空所有复选框
  clear = () => {
    this.headerCheckboxChange('clear');
  }

  render() {
    const { departmentCheckState, department: {name, children} } = this.state;
    let total = 0;
    const items = children.map( job => {
      if (job.checked) {
        total += job.number;
      }
      return <JobTreeItem 
        key={job.key} 
        job={job} 
        checkState={ job.checked ? 'all' : 'null' }
        checkboxClick={ this.listCheckboxChange.bind(this, job.key) }
      />
    });

    return (
      <div className="department">
        <JobTreeDepartHeader 
          name={name} 
          total={total}
          checkboxClick={ this.headerCheckboxChange }
          checkState={ departmentCheckState }
        />
        <ul>{items}</ul>
      </div>
    )
  }
}


// 招聘组件 - 主体
class JobTreeBody extends Component {
  constructor(props) {
    super(props);
    this.departments = [];
  }

  // 清空所有复选框
  clear = () => {
    this.departments.forEach( depart => {
      depart.current.clear();
    });
  }
  
  render() {
    const departments = [],
      jobs = this.props.jobs;

    jobs.forEach(department => {
      const ref = React.createRef();
      this.departments.push(ref);

      departments.push(
        <JobTreeDepartment
          departJobs={department} 
          ref={ref}
          key={department.key}
        />
      );
    }, this);

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
        <div className="btn sub-color"
          onClick={this.props.clear}
        >
          清空
        </div>
      </header>
    )
  }
}


// 招聘组件
class JobTree extends Component {
  constructor(props) {
    super(props);
    this.jobTreeBody = React.createRef();
  }

  clear = () => {
    this.jobTreeBody.current.clear();
  }

  render() {
    return (
      <div className="jobtree">
        <JobTreeHeader clear={this.clear} />
        <JobTreeBody 
          jobs={this.props.jobs} 
          ref={this.jobTreeBody}
        />
      </div>
    );
  }
}

export default JobTree;