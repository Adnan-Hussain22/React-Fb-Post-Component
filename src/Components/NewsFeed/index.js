import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../App.css";
import "./index.css";
import defaultAvatar from "../../Helpers/Images/default Avatar.jpg";
import ReactFbImageGrid from "react-fb-image-grid";
import FacebookEmoji from "react-facebook-emoji";

class Post extends Component {
  constructor(props) {
    super();
    this.state = {
      avatar: props.avatar,
      userName: props.userName,
      time: props.time ? props.time : new Date().toLocaleTimeString(),
      privacy: props.privacy,
      description: props.description,
      emojis: false,
      images: props.images
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }

  handleShowEmojis = e => {
    this.setState({ emojis: true });
  };

  handleHideEmojis = () => {
    this.setState({ emojis: false });
  };

  render() {
    const { images } = this.state;
    return (
      <div className={"newsfeed-component " + this.props.className}>
        {this.renderHeader()}
        {images.length != 0 && this.renderEmojis()}
        {this.renderFooter()}
      </div>
    );
  }

  renderHeader() {
    const { avatar, userName, privacy, description } = this.state;
    return (
      <div className="newsfeed-header">
        <div className="post-info">
          <div className="avatar">
            <img src={avatar ? avatar : defaultAvatar} />
          </div>
          <div className="info">
            <span className="user-name">
              <a href="#">{userName ? userName : "Adnan Hussain"}</a>
            </span>
            <br />
            <span className="time">
              {new Date().toLocaleTimeString()} &nbsp; - &nbsp;
            </span>
            <span className="privacy">
              <i
                className={
                  privacy === "Public"
                    ? "fas fa-globe-asia"
                    : "fas fa-user-friends"
                }
              />
            </span>
          </div>
        </div>
        <div className="post-description">
          {description ? description : "Some caption/description"}
        </div>
        <div className="post-options" style={{ cursor: "pointer" }}>
          <i className="fas fa-ellipsis-h" />
        </div>
      </div>
    );
  }

  renderImageGrid() {
    const { images } = this.state;
    return (
      <div>
        <ReactFbImageGrid images={images} />
      </div>
    );
  }

  renderFooter() {
    const { reaction, emojis } = this.state;
    return (
      <div className="newsfeed-footer">
        <ul className="post-actions" id="fbPostActions">
          <li
            onMouseEnter={this.handleShowEmojis}
            onMouseLeave={this.handleHideEmojis}
          >
            {emojis && this.renderEmojis()}
            {!reaction && (
              <span>
                <i className="far fa-thumbs-up" />
                Like
              </span>
            )}
          </li>
          <li>
            <i className="far fa-comment" />
            Comment
          </li>
          <li>
            <i className="fa fa-share" />
            Share
          </li>
        </ul>
      </div>
    );
  }

  renderEmojis() {
    return (
      <div className="Emojis">
        <FacebookEmoji type="like" size="sm" />
        <FacebookEmoji type="love" size="sm" />
        <FacebookEmoji type="wow" size="sm" />
        <FacebookEmoji type="yay" size="sm" />
        <FacebookEmoji type="angry" size="sm" />
        <FacebookEmoji type="haha" size="sm" />
        <FacebookEmoji type="sad" size="sm" />
      </div>
    );
  }
}

export default Post;
