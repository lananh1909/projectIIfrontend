import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
  
const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
};
class Chart extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                    label: 'Người dùng',
                    data: [0,0,0,0,0,0,0,0,0,0,0,0],
                    fill: false,
                    backgroundColor: '#0000ff',
                    borderColor: '#9999ff',
                    },
                    {
                    label: 'Đơn đăng ký',
                    data: [0,0,0,0,0,0,0,0,0,0,0,0],
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                    }
                ],
            },
            user: [],
            attend: []
        }
    }

    componentDidMount() {
        this.setState({
            user: this.props.user,
            attend: this.props.attend
        }, () => this.genChart())        
    }

    componentDidUpdate(props, state){
        if(props !== this.props)
        this.setState({
            user: this.props.user,
            attend: this.props.attend
        }, () => this.genChart())    
    }

    genChart = () => {
        var tmp = {...this.state.data};
       
        if(this.state.user){
            if(tmp.datasets)
            this.state.user.forEach(element => {
                tmp.datasets[0].data[String(element.month)] = element.count
            });
        }
        this.setState({
            data: tmp
        }) 
        if(this.state.attend){
            if(tmp.datasets)
            this.state.attend.forEach(element => {
                tmp.datasets[1].data[String(element.month)] = element.count
            });
        }
        this.setState({
            data: tmp
        }) 
    }
    
    render() {
        return (
            <div>
                <Line data={this.state.data} options={options}/>
            </div>
        );
    }
}

export default Chart;