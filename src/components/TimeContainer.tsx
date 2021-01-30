import * as React from 'react';
import TimeInput from './TimeInput';
import { ifExistCall } from '../utils/FunctionUtil';

interface Props {
  /** hour to display */
  hour?: number;
  /** minute to display */
  minute?: number;
  allowedTime?: boolean;
  /** hour, minute, type change event */
  onChange?: (hour: number, minute: number) => void;
  /** hour, minute blur event */
  onBlur?: (hour: number, minute: number) => void;
}

interface State {
  starthour: number;
  startminute: number;
  endhour: number;
  endminute: number;
  startsessions: string;
  endsessions: string;
  allowedTime?: boolean;
}

class TimeContainer extends React.Component<Props, State> {
  public state = {
    allowedTime: this.props.allowedTime,
    starthour: new Date().getHours() % 12 || 12,
    startminute: this.props.minute || 0,
    startsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
    endhour: new Date().getHours() % 12 || 12,
    endminute: this.props.minute || 0,
    endsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
  };

  public handleChange = (item: string) => (e: React.FormEvent<HTMLInputElement>) => {
    const min = 0;
    const max = item === 'starthour' || item === 'endhour' ? 12 : 59;
    let value = parseInt(e.currentTarget.value, 10);
    
    if (isNaN(value)) {
      value = 0;
    }

    if (max < value) {
      value = max;
    }

    if (min > value) {
      value = min;
    }

    this.setState(
      {
        ...this.state,
        [item]: value,
      },
      () => this.invokeOnChange()
    );
  };

  public handleUp = (item: string, data: string) => () => {
    let maxd = 12;
    if(this.props.allowedTime === true && this.state.startsessions === "AM" && data === "startsessions" && this.state.starthour < 8){
      this.setState({starthour: 8}, () => {this.upChangeFunction(item, maxd);});
    }else if(this.props.allowedTime === true && this.state.endsessions === "AM" && data === "endsessions" && this.state.endhour < 8){
      this.setState({endhour: 8}, () => {this.upChangeFunction(item, maxd);});
    }else {
      if(this.props.allowedTime === true && this.state.startsessions === "PM" && data === "startsessions"){
        maxd = 4;
      }else if(this.props.allowedTime === true && this.state.endsessions === "PM" && data === "endsessions"){
        maxd = 4;
      }
    }
    this.upChangeFunction(item, maxd);
  };

  public upChangeFunction = (item: string, maxd: number) => {
    const max = item === 'starthour' || item === 'endhour' ? maxd : 59;
    const value = this.state[item];
    this.setState(
      {
        ...this.state,
        [item]: Math.min(value + 1, max),
      },
      () => this.invokeOnChange()
    );
  }

  public handleDown = (item: string, data: string) => () => {
    let min = 0;
    if(this.props.allowedTime === true && this.state.startsessions === "PM" && data === "startsessions" && this.state.starthour > 4){
      this.setState({...this.state, starthour: 4},() => {this.downChangeFunction(item, min);});
    }else if(this.props.allowedTime === true && this.state.endsessions === "PM" && data === "endsessions" && this.state.endhour > 4){
      this.setState({endhour: 4},() => {this.downChangeFunction(item, min);});
    }else {
      if( this.props.allowedTime === true && this.state.startsessions === "AM" && data === "startsessions"){
        min = 8;
      }else if(this.props.allowedTime === true && this.state.endsessions === "AM" && data === "endsessions"){
        min = 8;
      }
      this.downChangeFunction(item, min);
    }
  };

  public downChangeFunction = (item: string, min: number) => {
    const value = this.state[item];
      this.setState(
        {
          ...this.state,
          [item]: Math.max(value - 1, min),
        },
        () => this.invokeOnChange()
      );
  }

  public handleSession = (data: string, item: string) => () => {
    this.setState(
      {
        ...this.state,
        [data]: item === 'AM' ? 'PM' : 'AM',
      },
      () => this.invokeOnChange()
    );
  };

  public handleBlur = () => {
    const { onBlur } = this.props;
    const { starthour, startminute } = this.state;
    ifExistCall(onBlur, starthour, startminute);
  };

  public invokeOnChange = () => {
    const { onChange } = this.props;
    const { starthour, startminute, startsessions, endhour, endminute, endsessions } = this.state;
    const starttime = `${starthour}:${startminute} ${startsessions}`;
    const endtime = `${endhour}:${endminute} ${endsessions}`;
    ifExistCall(onChange, starttime, endtime);
  };

  public onNowPress = (data: string) => {
    if(data === "startsessions"){
      this.setState({
        ...this.state,
        starthour: new Date().getHours() % 12 || 12,
        startminute: new Date().getMinutes() || 0,
        startsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
      },
      () => this.invokeOnChange()
      );
    }else {
      this.setState({
        ...this.state,
        endhour: new Date().getHours() % 12 || 12,
        endminute: new Date().getMinutes() || 0,
        endsessions: new Date().getHours() >= 12 ? 'PM' : 'AM',
      },
      () => this.invokeOnChange()
      );
    }
  }

  public onTimePress = (data: string) => {
    if(data === "startsessions"){
      this.setState({
        ...this.state,
        starthour: 12,
        startminute: 0,
        startsessions: 'AM',
      },
      () => this.invokeOnChange()
      );
    }else {
      this.setState({
        ...this.state,
        endhour: 12,
        endminute: 0,
        endsessions: 'AM',
      },
      () => this.invokeOnChange()
      );
    }
  }

  public render() {
    const { starthour, startminute, startsessions, endhour, endminute, endsessions } = this.state;
    return (
      <div className="sample-check">
        <div className="time__container">
          <div>Start Time</div>
          <div className="container_flx">
            <div className="time-container mouse-over" onClick={() => this.onTimePress("startsessions")}>12:00 AM </div>
            <div className="time-container mouse-over" onClick={() => this.onNowPress("startsessions")}> NOW</div>
          </div>
          <div className="time-style">
            <div>
              <div>Hours</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('starthour', "startsessions")}
                  onDown={this.handleDown('starthour', "startsessions")}
                  onChange={this.handleChange('starthour')}
                  onBlur={this.handleBlur}
                  value={starthour}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>Minutes</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('startminute', "startsessions")}
                  onDown={this.handleDown('startminute', "startsessions")}
                  onChange={this.handleChange('startminute')}
                  onBlur={this.handleBlur}
                  value={startminute}
                />
              </div>
            </div>
            <div className="time__container__div colon">:</div>
            <div>
              <div>AM/PM</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleSession('startsessions', startsessions)}
                  onDown={this.handleSession('startsessions', startsessions)}
                  onBlur={this.handleBlur}
                  value={startsessions}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="time__container">
          <div>End Time</div>
          <div className="container_flx">
            <div className="time-container mouse-over"onClick={() => this.onTimePress("endsessions")}>12:00 AM </div>
            <div className="time-container mouse-over" onClick={() => this.onNowPress("endsessions")}> NOW</div>
          </div>
          <div className="time-style">
            <div>
              <div>Hours</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('endhour', "endsessions")}
                  onDown={this.handleDown('endhour', "endsessions")}
                  onChange={this.handleChange('endhour')}
                  onBlur={this.handleBlur}
                  value={endhour}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>Minutes</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleUp('endminute', "endsessions")}
                  onDown={this.handleDown('endminute', "endsessions")}
                  onChange={this.handleChange('endminute')}
                  onBlur={this.handleBlur}
                  value={endminute}
                />
              </div>
            </div>
            <div className="time__container__div">:</div>
            <div>
              <div>AM/PM</div>
              <div className="ed-time">
                <TimeInput
                  onUp={this.handleSession('endsessions', endsessions)}
                  onDown={this.handleSession('endsessions', endsessions)}
                  onBlur={this.handleBlur}
                  value={endsessions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeContainer;
