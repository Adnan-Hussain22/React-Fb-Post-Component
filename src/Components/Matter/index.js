import React, { Component } from "react";
import "./index.css";
import { Input, Icon, Select, Upload, message, Button } from "antd";
import "antd/dist/antd.css";
const { Option } = Select;
const { TextArea } = Input;
class Matter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName,
      description: props.description,
      privacy: props.privacy,
      loading: false,
      images: props.images,
      avatar: props.avatar
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }

  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg" || "image/png" || "image/jpg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error("Image must smaller than 20MB!");
    }
    return isJPG && isLt20M;
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleAvatarChange = info => {
    const { getAvatar } = this.props;
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, getAvatar);
    }
  };

  emitEmpty = () => {
    this.userNameInput.focus();
    this.props.handelUserNameChange("");
  };

  render() {
    const styleClass = this.props.className;
    const { userName, description, avatar, loading, privacy } = this.state;
    return (
      <div
        className={"matter-component " + styleClass}
        style={{ marginRight: "20px", marginBottom: "20px" }}
      >
        {this.renderMatter(avatar, userName, description, privacy, loading)}
        {this.renderImagesUploader()}
      </div>
    );
  }

  renderMatter(avatar, userName, description, privacy, loading) {
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    const uploadButton = (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload Avatar</div>
      </div>
    );

    return (
      <div className="matter-container row">
        <div className="avatar-container col-md-3">
          <div className="avatar">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//jsonplaceholder.typicode.com/posts/"
              beforeUpload={this.beforeUpload}
              onChange={this.handleAvatarChange}
            >
              {avatar ? <img src={avatar} alt="avatar" /> : uploadButton}
            </Upload>
          </div>
        </div>
        <div className="matter col-md-9">
          <Input
            placeholder="Enter your username"
            prefix={
              <Icon
                type="user"
                style={{ color: "rgba(0,0,0,.25)", width: "30%" }}
              />
            }
            suffix={suffix}
            value={userName}
            onChange={e => {
              this.props.handelUserNameChange(e.target.value);
            }}
            ref={node => (this.userNameInput = node)}
            className="input-username"
          />
          <Select
            value={privacy}
            style={{ width: "30%" }}
            onChange={e => {
              this.props.handelSelectPrivacyChange(e);
            }}
          >
            <Option value="Public">Public</Option>
            <Option value="Friends">Friends</Option>
          </Select>
          <TextArea
            rows={4}
            placeholder="Some caption or description"
            value={description}
            onChange={e => {
              this.props.handleDescriptionChange(e.target.value);
            }}
          />
        </div>
      </div>
    );
  }

  renderImagesUploader() {
    const { images } = this.state;
    const props = {
      listType: "picture",
      onChange: () => this.props.uploadImages,
      multiple: true
    };
    return (
      <div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Upload
          </Button>
        </Upload>
      </div>
    );
  }
}

export default Matter;
