import React, { Component } from "react";
import "./App.css";
import Matter from "./Components/Matter";
import NewsFeed from "./Components/NewsFeed";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: "",
      description: "",
      privacy: "Privacy",
      images: [],
      avatar: ""
    };
  }

  uploadImages = info => {
    const infoList = info.fileList;
    const images = [];
    for (let index = 0; index < infoList.length; index++) {
      images.push(infoList[index].thumbUrl);
    }
    this.setState({ images });
  };

  getAvatar = avatar => {
    this.setState({
      avatar
    });
  };

  handelUserNameChange = userName => {
    this.setState({ userName });
  };

  handelSelectPrivacyChange = privacy => {
    this.setState({ privacy });
  };

  handleDescriptionChange = description => {
    this.setState({ description });
  };

  render() {
    const { userName, description, privacy, images, avatar } = this.state;
    const props = {
      userName,
      description,
      privacy,
      images,
      avatar,
      getAvatar: this.getAvatar,
      uploadImages: this.uploadImages,
      handelUserNameChange: this.handelUserNameChange,
      handelSelectPrivacyChange: this.handelSelectPrivacyChange,
      handleDescriptionChange:this.handleDescriptionChange
    };
    return (
      <div className="App row" style={{ justifyContent: "center" }}>
        <Matter className="col-md-5 col-sm-5" {...props} />
        <NewsFeed
          className="col-md-5 col-sm-5"
          userName={userName}
          description={description}
          privacy={privacy}
          images={images}
          avatar={avatar}
        />
      </div>
    );
  }
}

export default App;
