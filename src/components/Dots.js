import React from "react";
import { Typography } from "@material-ui/core";

class Dots extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dots: 1 };
    this.duration = parseInt(this.props.duration);
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { dots } = this.state;
      this.setState({ dots: dots === 3 ? 0 : dots + 1 });
    }, this.duration);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { dots } = this.state;
    let text = dots === 0 ? "" : ".".repeat(dots);
    return (
      <Typography variant="h6" style={{ fontFamily: "Garamond" }}>
        {this.props.message}&ensp;{text}
      </Typography>
    );
  }
}

export default Dots;
