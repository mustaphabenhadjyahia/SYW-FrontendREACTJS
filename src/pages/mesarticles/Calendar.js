import * as React from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import {
  ViewState
} from '@devexpress/dx-react-scheduler';
import Button from "@material-ui/core/Button";
import {
  Scheduler,
  Toolbar,
  DayView,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DateNavigator, TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { TextField } from "@material-ui/core";


const URL = 'https://js.devexpress.com/Demos/Mvc/api/SchedulerData/Get';

const makeQueryString = (currentDate, currentViewName) => {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  const start = moment(currentDate).startOf(currentViewName.toLowerCase());
  const end = start.clone().endOf(currentViewName.toLowerCase());
  return encodeURI(`${URL}?filter=[["EndDate", ">", "${start.format(format)}"],["StartDate", "<", "${end.format(format)}"]]`);
};


const styles = theme=>({
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  }
});

const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>
        {children}
      </Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  ),
);

const mapAppointmentData = appointment => ({
  ...appointment,
  startDate: appointment.startDate,
  endDate: appointment.endDate,
  title: appointment.title,
});


class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentDate: new Date(),
      currentViewName: 'Day',
    };
    this.loadData = this.loadData.bind(this);
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName, loading: true });
    };
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate, loading: true });
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { currentDate, currentViewName } = this.state;
    const queryString = makeQueryString(currentDate, currentViewName);
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }
    var d =[{"title":"tawa","description":"gggggg","location":"hhhhhhh",
    "startDate":new Date(2020,4,14,8,0,0,0),
    "endDate":new Date(2020,4,14,9,0,0,0)}]
    this.setState({ data:d  });
   
     this.setState({ loading: false })
    this.lastQuery = queryString;
    
  
      
      
   
  }





  render() {
    const {
      data, loading,
      currentDate, currentViewName,startDayHour,editingFormVisible
    } = this.state;
    const { classes } = this.props;

    const formattedData = data
      ? data.map(mapAppointmentData) : [];
    console.log(formattedData);
    return (

      <Paper>

        <Scheduler
          data={formattedData}
          height={660}
        >
          <ViewState
            currentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView
            startDayHour={0}
            endDayHour={24}
          />
          <WeekView
            startDayHour={0}
            endDayHour={24}
          />
          <MonthView
          />

          <Appointments />
          <Toolbar
            {...loading ? { rootComponent: ToolbarWithLoading } : null}
          />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <AppointmentTooltip
            showOpenButton
            showCloseButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>

      </Paper>

    );
  }
}

export default withStyles(styles, { name: 'EditingDemo' })(Demo);
