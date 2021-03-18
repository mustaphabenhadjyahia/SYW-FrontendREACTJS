import * as React from "react";
import {AppointmentForm} from "@devexpress/dx-react-scheduler-material-ui";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Button from "@material-ui/core/Button";
import {AddEvent,UpdateEvent} from "../../context/EventContext";
import { withStyles } from "@material-ui/core";
import LocationOn from '@material-ui/icons/LocationOn';
import Notes from '@material-ui/icons/Notes';
import Close from '@material-ui/icons/Close';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Create from '@material-ui/icons/Create';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";

import DialogActions from "@material-ui/core/DialogActions/DialogActions";


import { DataContext, DataProvider } from "./ChooseOutfit/DataContext";
import {SelectorChild} from './ChooseOutfit/index'

const containerStyles = theme => ({
  container: {
    width: theme.spacing(68),
    padding: 0,
    paddingBottom: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  header: {
    overflow: 'hidden',
    paddingTop: theme.spacing(0.5),
  },
  closeButton: {
    float: 'right',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2),
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  picker: {
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0,
    },
    width: '50%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 0),
  },
  icon: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
});

class AppointmentFormContainerBasic extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      appointmentChanges: {},
      outfitVisible: false,
      outfit: [],
      data: [],
    };

    this.getAppointmentData = () => {
      const { appointmentData } = this.props;
      return appointmentData;
    };
    this.getAppointmentChanges = () => {
      const { appointmentChanges } = this.state;
      return appointmentChanges;
    };

    this.changeAppointment = this.changeAppointment.bind(this);
    this.commitAppointment = this.commitAppointment.bind(this);


  }
  componentDidMount() {
    axios.get('http://localhost:8080/events/'+localStorage.getItem('id_token'))
      .then(response => response.data)
      .then(data=>setTimeout(() => {
        this.setState({
          data:data,
        })}, 600)
      )
      .catch(() => this.setState({ loading: false }));
  }

  componentDidUpdate() {
    axios.get('http://localhost:8080/events/'+localStorage.getItem('id_token'))
      .then(response => response.data)
      .then(data=>setTimeout(() => {
        this.setState({
          data:data,
        })}, 600)
      )
      .catch(() => this.setState({ loading: false }));
  }

  changeAppointment({ field, changes }) {
    const nextChanges = {
      ...this.getAppointmentChanges(),
      [field]: changes,
    };
    this.setState({
      appointmentChanges: nextChanges,
    });
  }

  commitAppointment(type) {
    const { commitChanges } = this.props;
    const appointment = {
      ...this.getAppointmentData(),
      ...this.getAppointmentChanges(),
    };
    if (type === 'deleted') {
      commitChanges({ [type]: appointment._id });
    } else if (type === 'changed') {
      commitChanges({ [type]: { [appointment._id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });

    }
    this.setState({
      appointmentChanges: {},
    });
  }

  removeDuplicates(tab) {
    let unique = {};
    tab.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  getSelected(values) {
    //console.log('Selected outfit: ', values);
    var tab = [];
    var cat = [];
    for (var e in values) {
      tab.push(values[e]._id);
      cat.push(values[e].categories[0].name)
    }
    var tab2 = this.removeDuplicates(tab);
    var tab3 = this.removeDuplicates(cat);
    var tab4 = [];

    for (let e in this.state.data)
      tab4.push(this.state.data[e].outfit)

    if (tab2.length < tab.length)
      alert('Duplicated item !');

    if (tab3.length < cat.length)
      alert('Choose one item from each category !');

    else {
      var bool;

      for (var e in tab4) {
        console.log(tab4[e].length);
        for (var i = 0; i < tab4[e].length; i++) {
          for (var v in values) {
            if (tab4[e].length === values.length  && values[v]._id === tab4[e][i]._id)
            {console.log(' tab4[e][i] : ' + tab4[e][i]._id)
              console.log( ' values[v] : '+values[v]._id)
              console.log(' values.length : '+values.length)
              console.log(' tab4[e].length : ' + tab4[e].length)
              bool = true;}
          }
        }
      }
      if (bool === true)
        alert('Same outfit already used in other event ( This is just a reminder, ignore if you are sure of your choices. )')
      this.state.outfit = values;
      this.setState({ outfitVisible: false });
      //console.log('outfit : ' + this.state.outfit);


    }
  }



  render() {

    const {
      classes,
      visible,
      visibleChange,
      appointmentData,
      cancelAppointment,
      target,
      onHide,
    } = this.props;
    const { appointmentChanges,outfitVisible, outfit} = this.state;

    const displayAppointmentData = {
      ...appointmentData,
      ...appointmentChanges,
    };

    const isNewAppointment = appointmentData._id === undefined;
    const applyChanges = isNewAppointment
      ? () => this.commitAppointment('added')
      : () => this.commitAppointment('changed');

    const textEditorProps = field => ({
      variant: 'outlined',
      onChange: ({ target: change }) => this.changeAppointment({
        field: [field], changes: change.value,
      }),
      value: displayAppointmentData[field] || '',
      label: field[0].toUpperCase() + field.slice(1),
      className: classes.textField,
    });

    const pickerEditorProps = field => ({
      className: classes.picker,
      // keyboard: true,
      ampm: false,
      value: displayAppointmentData[field],
      onChange: date => this.changeAppointment({
        field: [field], changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
      }),
      inputVariant: 'outlined',
      format: 'DD/MM/YYYY HH:mm',
      onError: () => null,
    });

    const cancelChanges = () => {
      this.setState({
        appointmentChanges: {},
        outfit: [],
      });
      visibleChange();
      cancelAppointment();
    };





    return (
      <AppointmentForm.Overlay
        visible={visible}
        target={target}
        fullSize
        onHide={onHide}
      >
        <div>
          <div className={classes.header}>
            <IconButton
              className={classes.closeButton}
              onClick={cancelChanges}
            >
              <Close color="action" />
            </IconButton>
          </div>
          <div className={classes.content}>
            <div className={classes.wrapper}>
              <Create className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('title')}

              />
            </div>
            <div className={classes.wrapper}>
              <CalendarToday className={classes.icon} color="action" />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Start Date"
                  {...pickerEditorProps('startDate')}

                />
                <KeyboardDateTimePicker
                  label="End Date"
                  {...pickerEditorProps('endDate')}

                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.wrapper}>
              <LocationOn className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('location')}

              />
            </div>
            <div className={classes.wrapper}>
              <Notes className={classes.icon} color="action" />
              <TextField
                {...textEditorProps('description')}
                multiline
                rows="6"
              />
            </div>
            {this.state.outfit != null && isNewAppointment ?
            this.state.outfit.map(o=>



              <img src={`http://localhost:81/Images/Images/${o.image.name}`} style={{ width: '15%', maxHeight: '150px' }}/>
             ) : appointmentData.outfit.map(o=>


                 <img src={`http://localhost:81/Images/Images/${o.image.name}`} style={{ width: '15%', maxHeight: '150px'}}/>
              )}
          </div>






          <div className={classes.buttonGroup}>

            {!isNewAppointment && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  visibleChange();
                  this.commitAppointment('deleted');
                  console.log(appointmentData._id);
                }}
              >
                Delete
              </Button>


              )}
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                applyChanges();
                {isNewAppointment ?
                  AddEvent(localStorage.getItem('id_token'),textEditorProps('title').value,pickerEditorProps('startDate').value,pickerEditorProps('endDate').value,textEditorProps('location').value,textEditorProps('description').value,this.state.outfit)
                  : UpdateEvent(appointmentData._id,textEditorProps('title').value,pickerEditorProps('startDate').value,pickerEditorProps('endDate').value,textEditorProps('location').value,textEditorProps('description').value,appointmentData.outfit)}

              }}
            >
              {isNewAppointment ? 'Create' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.setState({outfitVisible:true});
                console.log(outfitVisible);

                }}
            >
              {isNewAppointment ? 'Choose Outfit' : 'Update Outfit'}
            </Button>
          </div>
        </div>
        <Dialog
          open={outfitVisible}
        >
          <DialogTitle>
            Choose Outfit
          </DialogTitle>

          <DialogContent>

            <DataProvider>
              <DataContext.Consumer>
                {context => (
                  <div className="react-awesome-selector-wrapper">
                    <SelectorChild
                      selectedTitle={this.props.selectedTitle}
                      context={context}
                      data={this.props.data}
                    />
                    <center> <button
                      className="react-awesome-selector-submit-button"
                      onClick={() => {
                        this.getSelected(context.selectedList);
                        appointmentData.outfit=this.state.outfit;
                        this.setState({outfitVisible:false})
                      }}
                    >
                      Submit
                    </button>
                    </center>
                  </div>
                )}
              </DataContext.Consumer>

            </DataProvider>




          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.setState({outfitVisible:false})} color="secondary" variant="outlined">
              Close
            </Button>

          </DialogActions>
        </Dialog>

      </AppointmentForm.Overlay>
    );
  }
}

export const AppointmentFormContainer = withStyles(containerStyles, { name: 'AppointmentFormContainer' })(AppointmentFormContainerBasic);
