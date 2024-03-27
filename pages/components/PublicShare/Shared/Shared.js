import { React, Fragment, useEffect, useState } from "react";
import Head from 'next/head';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
// import "./Shared.scss";
// import "../../../shades/Bucket.scss";
import TopBarPublic from "../TopbarPublic/TopbarPublic";
import CalenderIcon from "../../../assets/icons/calendar.svg";
import PreviousIcon from "../../../assets/icons/Previous.svg";
import NextIcon from "../../../assets/icons/Next.svg";
import TwitterPublic from "../../../assets/icons/twitterPublic.svg";
import linkIcon from "../../../../public/icons/linksicon.svg";
import CardDetail from "../../../assets/images/cardDetailImage.png";
import DownloadButton from "../../../../public/icons/blackDownload.svg";
import LandingPage from "../../../../public/images/landingPage.png";
import PurpleLink from "../../../../public/icons/purpleLink.svg";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import twitterlogo from "../../../../public/images/twitternewlogo.svg";
import FbIcon from "../../../../public/images/facebook-svgrepo-com.svg";
import ZimzeeIcon from "../../../../public/icons/logoSymbol.svg";
import FullScreen from "../../../../public/icons/FullScreen.svg";
import RegionalScreen from "../../../../public/icons/RegionalScreenshot.svg";
import Highlight from "../../../../public/icons/HighlightText.svg";
import youtubeIcon from "../../../../public/images/youtube.svg";
import tiktokIcon from "../../../../public/images/download-tiktok.png";
import instagramIcon from "../../../../public/images/instagram-icon-png.png";
import defaultUser from "../../../../public/images/default-user.png";
import BookmarkPreview from "../../../../public/icons/bookmarksPreviews.svg";
import resizeIcon from "../../../../public/icons/resizeIcon.svg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SliderPopup from "../../../shades/cards/Sliderpopup";
import { toastify } from "../../../../components/Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookmarkDetailIcon from "../../../../public/icons/bookmarkdetail.svg";
// import Paragraphs from "../../../shades/cards/Paragraph";
// import ReactQuill from "react-quill";
import { useRouter } from 'next/router'

import { Helmet } from "react-helmet";
import Intercom from "../../intercom/Intercom";
import Image from 'next/image'
const Shared = (props) => {
  // console.log(props.shared,"props")
  const router = useRouter()
  const [subBucket, setSubBucket] = useState({});
  //same name as name of your file, can be [slug].js; [specialId].js - any name you want
  // console.log(router.query.slug,"router.query")
  const cardId = props.sharedId;
  // const cardId = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [code, setCode] = useState("");
  const [tags, setTags] = useState([]);
  const [imageUrlPopup, setimageUrlPopup] = useState("");
  const [bookmarkhandlePopup, setBookmarkhandlePopup] = useState(false);
  const [isPlayingPopup, setIsPlayingPopup] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceUrl, setSourceUrl] = useState("");
  // const navigate = useNavigate();
  // console.log(cardId, "carddddddddd id");
  const user = {
    firstName: null,
    email: null,
    createdAt: Math.floor(Date.now() / 1000),
  };
  useEffect(() => {
    console.log(user, "user on login");
    Intercom(user);
  }, [user]);
  useEffect(() => {
    const publicShared = async () => {
      try {
        setIsLoading(true);
        await axios
          .get(`https://prdapi.zimzee.com/api/cards/public-shared/${cardId}`)
          .then(function (response) {
            console.log(response?.data?.data, "public card");
            setIsLoading(false);
            setSubBucket(response?.data?.data);
            setCode(response?.data?.data?.note);
            setSourceUrl(response?.data?.data.content.sourceUrl);
            setTags(response?.data?.data?.tags);
          });
      } catch (error) {
        if (error) {
          // window.location.href = "https://www.zimzee.com/";
        }
        console.log(error);
      }
    };

    const getBrowserId = () => {
      // Implement your logic to generate or retrieve a unique browser ID
      // For example, you might use a combination of user agent and some randomization
      const userAgent = navigator.userAgent;
      console.log(userAgent, "userAgent");
      const randomPart = Math.random().toString(36).substring(2, 15);
      const browserId = `${userAgent}_${randomPart}`;

      return browserId;
    };

    const StarredCard = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.patch(
          `https://prdapi.zimzee.com/api/cards/updateSharedCard-engagements`,
          { cardId: cardId, views: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    const browserId = getBrowserId();
    console.log(browserId, "browserId");
    if (
      !localStorage.getItem("browserId") &&
      !localStorage.getItem("sharedCardId")
    ) {
      localStorage.setItem("browserId", browserId);
      localStorage.setItem("sharedCardId", cardId);
      const token = localStorage.getItem("token");
      StarredCard();
    } else {
      const sharedCardId = localStorage.getItem("sharedCardId");
      if (cardId !== sharedCardId) {
        localStorage.setItem("sharedCardId", cardId);
        StarredCard();
      }
    }
    publicShared();
  }, [cardId]);

  const handleCardClickRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://prdapi.zimzee.com/api/cards/updateSharedCard-engagements`,
        { cardId: cardId, clicks: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = async () => {
    if (
      localStorage.getItem("browserId") &&
      localStorage.getItem("sharedCardId") &&
      !localStorage.getItem("sharedClickCardId")
    ) {
      localStorage.setItem("sharedClickCardId", cardId);
      handleCardClickRequest();
    } else {
      const sharedClickCardId = localStorage.getItem("sharedClickCardId");
      if (cardId !== sharedClickCardId) {
        localStorage.setItem("sharedClickCardId", cardId);
        handleCardClickRequest();
      }
    }
  };

  const handleCardLink = async () => {
    const url = window.location.href;
    if (url) {
      // Create a temporary input element to copy the link to clipboard
      const tempInput = document.createElement("input");
      tempInput.value = url;

      // Append the input element to the DOM
      document.body.appendChild(tempInput);

      // Select the input element's text and copy it to clipboard
      tempInput.select();
      document.execCommand("copy");

      // Remove the temporary input element
      document.body.removeChild(tempInput);

      // Optionally, you can show a message to indicate that the link has been copied
      // console.log(response.data.message)
      toastify("success", "Public link is copied to clipboard");
    }
  };

  const handlePopup = () => {
    setPopup(true);
    setIsPlayingPopup(false);
  };

  const handlePlayVideoPopup = (event) => {
    // document.querySelector('video').play();
    if (isPlayingPopup) {
      document.querySelector(".bucketCreationPopup video").pause();
    } else {
      document.querySelector(".bucketCreationPopup video").play();
    }
    setIsPlayingPopup(!isPlayingPopup);
    event.stopPropagation();
  };

  function closePopup() {
    setPopup(false);
  }

  const handleImageClick = (imageUrl) => {
    console.log(imageUrl, "imageUrl for slider specific image");
    setimageUrlPopup(imageUrl);
    setBookmarkhandlePopup(true);
  };

  function closebookmarkPopup() {
    setBookmarkhandlePopup(false);
  }

  const handleChildClick = (event) => {
    event.stopPropagation();
    console.log("Child clicked");
  };

  const handlePlayVideo = (event) => {
    // document.querySelector('video').play();
    console.log("paly evenet");
    if (isPlaying) {
      document.querySelector(".video-content-inner video").pause();
    } else {
      document.querySelector(".video-content-inner video").play();
    }
    setIsPlaying(!isPlaying);
    event.stopPropagation();
  };

  const handleSignup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://prdapi.zimzee.com/api/cards/updateSharedCard-engagements`,
        { cardId: cardId, clicks: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      window.location.href= "https://app.zimzee.com/signup";
      // navigate("/signup");
    } catch (error) {
      console.error(error);
      // navigate("/signup");
      window.location.href= "https://app.zimzee.com/signup";
    }
  };
  let videoIframe = "";
  let videoIframePopup = "";
  if (
    subBucket?.content?.imageUrl.length > 0 &&
    subBucket?.content?.imageUrl[0].urlType == "Video" &&
    subBucket?.content?.html &&
    subBucket?.content?.imageUrl[0].url
  ) {
    videoIframe = subBucket?.content?.html;
    const tempElement = document.createElement("div");
    tempElement.innerHTML = videoIframe;
    // tempElement.find('iframe').attr('')
    const iframes = tempElement.querySelector("iframe");
    if (iframes) {
      const videoElement = document.createElement("video");
      videoElement.controls = isPlaying ? true : false;
      // videoElement.autoplay = true;

      const sourceElement = document.createElement("source");
      sourceElement.src = subBucket?.content?.imageUrl[0].url;
      sourceElement.type = "video/mp4";

      videoElement.appendChild(sourceElement);
      const playIcon = document.createElement("div");
      playIcon.className = "play-icon";
      playIcon.innerHTML = "&#9658;";

      // Wrap the video element with a container div
      const videoContainer = document.createElement("div");
      videoContainer.className = "video-container";
      videoContainer.appendChild(videoElement);
      // videoContainer.appendChild(playIcon);

      // Replace the iframe with the video element
      iframes.parentNode.replaceChild(videoContainer, iframes);
      // const myTimeout = setTimeout(myStopFunction, 1000);

      //     function myStopFunction() {
      //         console.log(document.getElementsByTagName('video')[0].clientHeight , "video height");
      //         setIsVideoHeight(document.getElementsByTagName('video')[0].clientHeight);
      //     }
    }

    // Get the updated HTML content from the temporary container
    const updatedHtml = tempElement.innerHTML;
    console.log(updatedHtml, "updatedHtml");
    videoIframe = updatedHtml;

    videoIframePopup = subBucket?.content?.html;
    const tempElementPopup = document.createElement("div");
    tempElementPopup.innerHTML = videoIframePopup;
    // tempElement.find('iframe').attr('')
    const iframesPopup = tempElementPopup.querySelector("iframe");
    if (iframesPopup) {
      const videoElementPopup = document.createElement("video");
      // videoElementPopup.controls = isPlayingPopup ? true : false;
      // videoElement.autoplay = true;

      const sourceElementPopup = document.createElement("source");
      sourceElementPopup.src = subBucket?.content?.imageUrl[0].url;
      sourceElementPopup.type = "video/mp4";

      videoElementPopup.appendChild(sourceElementPopup);
      // Wrap the video element with a container div
      const videoContainerPopup = document.createElement("div");
      videoContainerPopup.className = "video-container";
      videoContainerPopup.appendChild(videoElementPopup);
      // videoContainer.appendChild(playIcon);

      // Replace the iframe with the video element
      iframesPopup.parentNode.replaceChild(videoContainerPopup, iframesPopup);
    }

    // Get the updated HTML content from the temporary container
    const updatedHtmlPopup = tempElementPopup.innerHTML;
    console.log(updatedHtmlPopup, "updatedHtmlPopup");
    videoIframePopup = updatedHtmlPopup;
  }

  return (
    <>
      {isLoading ? (
        <div className="App-loading">
          <div className="App-logo" title="Zimzee" />
        </div>
      ) : (
        <div>
          {/* Use Helmet to dynamically set meta tags */}
          <Head>
                <title>{`Shared by Zimzee`}</title>
                <meta name="description" content={`Your easy solution to save, organize, Recall and Collaborate EVERYTHING important to you.  Save an ad, a video clip, full page screenshot, text, Youtube, Facebook`} />
            </Head>
          <Helmet>
            <title>Shared by Zimzee</title>
            <meta
              name="description"
              content="Your easy solution to save, organize, Recall and Collaborate EVERYTHING important to you.  Save an ad, a video clip, full page screenshot, text, Youtube, Facebook"
            />
            <meta
              property="og:image"
              content="https://statics.myclickfunnels.com/image/359988/file/1e07450180ca2b5a666dc018c2a3a26a.png"
            />
            {/* Add other meta tags as needed */}
          </Helmet>
          <TopBarPublic />
          <div className="publicshare-section">
            <ToastContainer />
            <div className="flex publicspace-content">
              <div className="publicdesc-content">
                <span>
                  {subBucket?.sharedItems
                    ? subBucket?.sharedItems[0]?.sharedBy?.firstName
                    : ""}{" "}
                  {subBucket?.sharedItems
                    ? subBucket?.sharedItems[0]?.sharedBy?.lastName
                    : ""}
                </span>{" "}
                shared this card using Zimzee.com
              </div>
              <div className="buttonpublic-content">
                <div className="flex items-center	">
                  <Image 
                    className="topinner-logo mr-[16px]"
                    src={
                      subBucket?.cardType
                        ? subBucket.cardType == "twitter"
                          ? twitterlogo
                          : subBucket.cardType == "facebook" ||
                            subBucket.cardType == "Facebook"
                          ? FbIcon
                          : subBucket.cardType == "screenshoot"
                          ? ZimzeeIcon
                          : subBucket.cardType == "fullScreen"
                          ? FullScreen
                          : subBucket.cardType == "partScreen"
                          ? RegionalScreen
                          : subBucket.cardType == "highlightText"
                          ? Highlight
                          : subBucket.cardType == "youtube"
                          ? youtubeIcon
                          : subBucket.cardType == "TikTok"
                          ? tiktokIcon
                          : subBucket.cardType == "instagram"
                          ? instagramIcon
                          : subBucket.cardType == "bookmark"
                          ? BookmarkDetailIcon
                          : defaultUser
                        : ""
                    }
                    alt="Icon"
                    style={{ cursor: "default" }}
                  />
                  <button
                    style={{
                      filter: "drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.161))",
                    }}
                    onClick={handleSignup}
                    className="buttonpadding-content text-[16px] rounded-full bg-[#FF6600] text-white"
                  >
                    <span className="savebutton-context">Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="cardHeaderDetails flex">
              {/* <div className="display-content">                   
            <ul className="flex flex-wrap items-center">
              <li className="text-[14px] lg:text-[17px]"><a className="flex items-center" href="/"><img src={CalenderIcon} alt='calenderIcon' className="w-[22px]"/> <span className="createdtext-content pl-2">Created Jan 5, 2022 @ 05:00 AM</span></a> </li>
            </ul>
          </div> 
          <div className="display-content">                   
            <ul className="flex flex-wrap items-center">
              <li className="text-[14px] lg:text-[17px]"><a className="flex items-center" href="/"><img src={CalenderIcon} alt='calenderIcon' className="w-[22px]"/> <span className="createdtext-content pl-2">Last updated on Jan 5, 2022 @ 4:30 PM</span></a> </li>
            </ul>
          </div> */}
              {/* <img className="mr-[7px] next-icons" src={PreviousIcon} alt="PreviousIcon"/>
          <img className="ml-[7px] next-icons" src={NextIcon} alt="NextIcon"/> */}
            </div>
            <div className="carddetail" onClick={handleCardClickRequest}>
              <div className="secondsections-content flex">
                <div className="cardData cardtextwhole-content w-2/3 sm:w-full width-50">
                  <div className="flex">
                    <Image
                      className="mr-[5px] inner-logo border-rounded"
                      src={
                        subBucket?.cardType
                          ? subBucket.cardType == "twitter"
                            ? twitterlogo
                            : subBucket.cardType == "facebook" ||
                              subBucket.cardType == "Facebook"
                            ? subBucket.postDetail
                              ? subBucket.postDetail.imageUrl
                              : FbIcon
                            : subBucket.cardType == "screenshoot"
                            ? ZimzeeIcon
                            : subBucket.cardType == "fullScreen"
                            ? FullScreen
                            : subBucket.cardType == "partScreen"
                            ? RegionalScreen
                            : subBucket.cardType == "highlightText"
                            ? Highlight
                            : subBucket.cardType == "youtube"
                            ? subBucket.postDetail
                              ? subBucket.postDetail.imageUrl
                              : youtubeIcon
                            : subBucket.cardType == "TikTok"
                            ? tiktokIcon
                            : subBucket.cardType == "instagram"
                            ? subBucket.postDetail
                              ? subBucket.postDetail.imageUrl
                              : instagramIcon
                            : defaultUser
                          : ""
                      }
                      alt="Icon" 
                      width={34}
                      height={34}
                    />
                    <span className="internetdesc-content">
                      {subBucket?.title}
                      <Image className="publiclink-imgcontent" src={linkIcon} onClick={handleCardLink} style={{width:"auto"}}/>
                      {/* <img
                        className="publiclink-imgcontent"
                        src={linkIcon}
                        alt="link-icon"
                        onClick={handleCardLink}
                      /> */}
                    </span>
                    {subBucket.cardType == "bookmark" ? (
                      <a href={`${sourceUrl}`} target="_blank">
                        <span>
                          <Image
                            className="resizeicons-imgcontent"
                            src={resizeIcon}
                            style={{
                              width: "19px",
                              marginLeft: "14px",
                              paddingTop: "2px",
                            }}
                          />
                        </span>
                      </a>
                    ) : subBucket.cardType === "File" ? null : (
                      <span onClick={handlePopup}>
                        <Image
                          className="resizeicons-imgcontent ml-[40px]"
                          src={resizeIcon}
                          style={{ width: "20px" }}
                        />
                      </span>
                    )}
                  </div>
                  <div className="detail-content cardHtmlnew-content">
                    {subBucket?.content ? (
                      subBucket.content.imageUrl.length > 0 &&
                      subBucket?.content?.imageUrl[0].urlType == "Image" &&
                      subBucket.content.html ? (
                        <div className="share-cardContent">
                          <div className="cardContent cardDetailContent">
                            <div className="cardImage w-full  atest">
                              {subBucket?.cardType ? (
                                subBucket.cardType == "twitter" ? (
                                  parse(subBucket.content.html)
                                ) : subBucket.cardType == "facebook" ? (
                                  subBucket?.content?.imageUrl[0]
                                    .isAdLibrary ? (
                                    <>
                                      <div className="ad-lib-first-html">
                                        {parse(subBucket.content.html)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="shared-first-html">
                                      {parse(subBucket.content.html)}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}

                              <div
                                className={`container fb-image ${
                                  subBucket?.cardType == "youtube"
                                    ? "youtube-container"
                                    : ""
                                }`}
                              >
                                {subBucket?.content?.imageUrl.length > 0 &&
                                subBucket?.content?.imageUrl[0].urlType ==
                                  "Image" &&
                                subBucket?.cardType !== "youtube" ? (
                                  subBucket.cardType == "bookmark" ? (
                                    <a
                                      href={`${subBucket?.content?.sourceUrl}`}
                                      target="_blank"
                                    >
                                      <img
                                        className="w-full dgdg"
                                        src={
                                          subBucket?.content?.imageUrl[0].url
                                        }
                                        alt="card-image"
                                      />
                                    </a>
                                  ) : (
                                    <img
                                      className="w-full dgdg"
                                      src={subBucket?.content?.imageUrl[0].url}
                                      alt="card-image"
                                      onClick={handlePopup}
                                    />
                                  )
                                ) : subBucket?.cardType == "youtube" ? (
                                  <iframe
                                    src={
                                      `https://www.youtube.com/embed/` +
                                      subBucket?.content?.sourceUrl
                                        .split("v=")[1]
                                        .split("&")[0]
                                    }
                                    width="560"
                                    height="315"
                                  ></iframe>
                                ) : (
                                  ""
                                )}
                              </div>
                              {subBucket?.cardType ? (
                                subBucket.cardType == "twitter" ? (
                                  ""
                                ) : subBucket.cardType == "facebook" ? (
                                  subBucket?.content?.imageUrl[0]
                                    .isAdLibrary ? (
                                    <>
                                      <div className="ad-lib-second-html">
                                        {parse(subBucket?.content?.html)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="shared-second-html">
                                      {parse(subBucket?.content?.html)}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ) : subBucket?.content?.imageUrl.length > 0 &&
                        subBucket?.content?.imageUrl[0].urlType == "Video" &&
                        subBucket?.content?.html == " " ? (
                        <div
                          className={`cardContent cardDetailContent video video-content-inner ${
                            isPlaying ? "active" : ""
                          }`}
                        >
                          {parse(subBucket?.content?.html)}

                          {/* {parse(videoIframe)} */}
                          <div className="video-container">
                            {isPlaying ? (
                              <video controls>
                                <source
                                  src={subBucket?.content?.imageUrl[0].url}
                                ></source>
                              </video>
                            ) : (
                              <video>
                                <source
                                  src={subBucket?.content?.imageUrl[0].url}
                                ></source>
                              </video>
                            )}

                            {isPlaying ? (
                              // <FontAwesomeIcon className="ml-[40px] text-[#989898]" icon={faPause} style={{color:"#fff",fontSize:"40px"}}/>
                              ""
                            ) : subBucket?.content?.imageUrl[0]?.url ? (
                              <>
                                <div
                                  className="toggle-view-icon-outer"
                                  onClick={handlePlayVideo}
                                >
                                  <div className="toggle-view-icon">
                                    <FontAwesomeIcon
                                      className="ml-[40px] text-[#989898]"
                                      icon={faPlay}
                                      style={{
                                        color: "#111111b0",
                                        fontSize: "40px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                          {/* <FontAwesomeIcon icon="fa-solid fa-play" /> */}

                          {subBucket?.cardType ? (
                            subBucket.cardType == "twitter" ? (
                              ""
                            ) : subBucket.cardType == "facebook" ? (
                              <div className="shared-second-html">
                                {parse(subBucket.content.html)}
                              </div>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      ) : subBucket?.content?.imageUrl.length > 0 &&
                        subBucket?.content?.imageUrl[0].urlType == "Video" &&
                        subBucket.content.html ? (
                        <div
                          className={`cardContent cardDetailContent video video-content-inner ${
                            isPlaying ? "active" : ""
                          }`}
                        >
                          {subBucket?.cardType ? (
                            subBucket.cardType == "twitter" ? (
                              parse(subBucket.content.html)
                            ) : subBucket.cardType == "facebook" ? (
                              subBucket?.content?.imageUrl[0].isAdLibrary ? (
                                <>
                                  <div className="ad-lib-first-html">
                                    {parse(subBucket.content.html)}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="shared-first-html">
                                    {parse(subBucket.content.html)}
                                  </div>
                                </>
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                          {/* {parse(videoIframe)} */}

                          {subBucket?.content?.imageUrl[0]?.url ? (
                            <div className="video-container">
                              {isPlaying ? (
                                <video controls>
                                  <source
                                    src={subBucket?.content?.imageUrl[0].url}
                                  ></source>
                                </video>
                              ) : (
                                <video>
                                  <source
                                    src={subBucket?.content?.imageUrl[0].url}
                                  ></source>
                                </video>
                              )}

                              {isPlaying ? (
                                // <FontAwesomeIcon className="ml-[40px] text-[#989898]" icon={faPause} style={{color:"#fff",fontSize:"40px"}}/>
                                ""
                              ) : subBucket?.content?.imageUrl[0]?.url ? (
                                <>
                                  <div
                                    className="toggle-view-icon-outer"
                                    onClick={handlePlayVideo}
                                  >
                                    <div className="toggle-view-icon">
                                      <FontAwesomeIcon
                                        className="ml-[40px] text-[#989898]"
                                        icon={faPlay}
                                        style={{
                                          color: "#111111b0",
                                          fontSize: "40px",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : subBucket?.cardType == "youtube" ? (
                            <div className="youtube-container">
                              <iframe
                                src={
                                  `https://www.youtube.com/embed/` +
                                  subBucket?.content?.sourceUrl
                                    .split("v=")[1]
                                    .split("&")[0]
                                }
                                width="560"
                                height="315"
                              ></iframe>
                            </div>
                          ) : (
                            ""
                          )}

                          {/* <FontAwesomeIcon icon="fa-solid fa-play" /> */}
                          {subBucket?.cardType ? (
                            subBucket.cardType == "twitter" ? (
                              ""
                            ) : subBucket.cardType == "facebook" ? (
                              subBucket?.content?.imageUrl[0].isAdLibrary ? (
                                <>
                                  <div className="ad-lib-second-html">
                                    {parse(subBucket.content.html)}
                                  </div>
                                </>
                              ) : (
                                <div className="shared-second-html">
                                  {parse(subBucket.content.html)}
                                </div>
                              )
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </div>
                      ) : subBucket.content.html ? (
                        <div className="cardContent cardDetailContent">
                          {subBucket.cardType == "bookmark" ? (
                            <a
                              href={`${subBucket?.content?.imageUrl?.url}`}
                              target="_blank"
                            >
                              <img
                                className="w-full"
                                src={BookmarkPreview}
                                alt="card-image"
                              />
                            </a>
                          ) : (
                            parse(subBucket.content.html)
                          )}
                        </div>
                      ) : (
                        <div className="cardContent cardDetailContent">
                          <div className="container fb-image cardImage w-full mt-6 btest">
                            {subBucket?.content?.imageUrl.length > 0 ? (
                              <img
                                className="w-full"
                                src={subBucket?.content?.imageUrl[0].url}
                                alt="card-image"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <img className="cardDetailpublic-imgcontent" src={CardDetail} alt="CardDetail" /> */}
                  {/* <div className="inviteBtn">
                <div className="btncard-invite rounded-full bg-[#FFFFFF] text-white sm:text-sm  md:text-md lg:text-lg" href="#"><img className="mr-2" src={DownloadButton} alt="downloadButton" />JPG</div>
              </div> */}
                  <br />
                  <div className="flex">
                    {subBucket?.content ? (
                      subBucket.content.imageUrl.length > 1 &&
                      subBucket?.content?.imageUrl[0].urlType == "Image" ? (
                        <div>
                          <SliderPopup
                            images={subBucket.content.imageUrl}
                            handleImageClick={handleImageClick}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {/* <div>
                    <img
                      className="floatingmenu-imgcontent"
                      src={FloatingMenu}
                      alt="FloatingMenu"
                    />
                  </div> */}
                  </div>
                  {popup && (
                    <div
                      className="bucketCreationPopup relative !z-[999]"
                      style={{ height: "100%" }}
                      onClick={closePopup}
                    >
                      <form
                        className="addBucket public-sharepopup relative w-[85%] md:w-[55%]"
                        onClick={handleChildClick}
                      >
                        <span
                          onClick={closePopup}
                          className="cls-btn absolute right-0 top-[7px] w-[30px] h-[30px] bg-[#FF6600] flex justify-center items-center rounded-full"
                          style={{ zIndex: 1 }}
                        >
                          <FontAwesomeIcon
                            className="cursor-pointer text-white text-[20px]"
                            icon={faClose}
                          />
                        </span>
                        {subBucket?.content ? (
                          subBucket.content.imageUrl.length > 0 &&
                          subBucket?.content?.imageUrl[0].urlType == "Image" &&
                          subBucket.content.html ? (
                            <div
                              className="popup-img"
                              style={{ maxHeight: "100vh" }}
                            >
                              {/* {(subBucket?.cardType)? (subBucket.cardType == 'twitter' ?  
                                                        parse(subBucket.content.html)
                                                    : subBucket.cardType == 'facebook' ? 
                                                    <div className="first-html">
                                                        {parse(subBucket.content.html)}
                                                    </div>
                                                    : ""):("")} */}
                              {subBucket?.cardType ? (
                                subBucket.cardType == "twitter" ? (
                                  parse(subBucket.content.html)
                                ) : subBucket.cardType == "facebook" ? (
                                  subBucket?.content?.imageUrl[0]
                                    .isAdLibrary ? (
                                    <>
                                      <div className="ad-lib-first-html">
                                        {parse(subBucket.content.html)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="shared-first-html">
                                      {parse(subBucket.content.html)}
                                      {/* <Paragraphs
                                                                text={subBucket.content.html}
                                                                maxLength={380}
                                                            /> */}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}

                              {/* {
                                                            (subBucket?.content?.imageUrl.length > 0 && subBucket?.content?.imageUrl[0].urlType == 'Image')? (
                                                                <img className="w-full" src={subBucket?.content?.imageUrl[0].url} alt="card-image"/>
                                                            ) :("")
                                                        } */}

                              {subBucket?.content?.imageUrl.length > 0 &&
                              subBucket?.content?.imageUrl[0].urlType ==
                                "Image" &&
                              subBucket?.cardType !== "youtube" ? (
                                <img
                                  className="w-full"
                                  src={subBucket?.content?.imageUrl[0].url}
                                  alt="card-image"
                                />
                              ) : subBucket?.cardType == "youtube" ? (
                                <iframe
                                  src={
                                    `https://www.youtube.com/embed/` +
                                    subBucket?.content?.sourceUrl
                                      .split("v=")[1]
                                      .split("&")[0]
                                  }
                                  width="100%"
                                  height="500px"
                                ></iframe>
                              ) : (
                                ""
                              )}

                              {subBucket?.cardType ? (
                                subBucket.cardType == "twitter" ? (
                                  ""
                                ) : subBucket.cardType == "facebook" ? (
                                  subBucket?.content?.imageUrl[0]
                                    .isAdLibrary ? (
                                    <>
                                      <div className="ad-lib-second-html">
                                        {parse(subBucket.content.html)}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="shared-second-html">
                                      {parse(subBucket.content.html)}
                                    </div>
                                  )
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                              {/* {(subBucket?.cardType)? (subBucket.cardType == 'twitter' ?  
                                                        ""
                                                    : subBucket.cardType == 'facebook' ? 
                                                        <div className="second-html">
                                                            {parse(subBucket.content.html)}
                                                        </div>
                                                    : ""):("")} */}

                              {/* {parse(subBucket.content.html)}
                                                    <img className="w-full" src={subBucket?.content?.imageUrl} alt="card-image" /> */}
                            </div>
                          ) : subBucket?.content?.imageUrl.length > 0 &&
                            subBucket?.content?.imageUrl[0].urlType ==
                              "Video" &&
                            subBucket.content.html ? (
                            <div
                              style={{ maxHeight: "100vh", overflow: "auto" }}
                            >
                              <div
                                className={`cardContent cardDetailContent video video-content-inner ${
                                  isPlayingPopup ? "active" : ""
                                }`}
                              >
                                {/* <Paragraphs
                                                        text={subBucket?.content?.html}
                                                        maxLength={380} /> */}

                                <div className="detail-page-see-data">
                                  <div className={`detail-text-wrapper active`}>
                                    {subBucket?.cardType ? (
                                      subBucket.cardType == "twitter" ? (
                                        parse(subBucket.content.html)
                                      ) : subBucket.cardType == "facebook" ? (
                                        subBucket?.content?.imageUrl[0]
                                          .isAdLibrary ? (
                                          <>
                                            <div className="ad-lib-first-html">
                                              {parse(subBucket.content.html)}
                                            </div>
                                          </>
                                        ) : (
                                          parse(subBucket.content.html)
                                        )
                                      ) : (
                                        ""
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                {/* {parse(subBucket?.content?.html)} */}
                                {subBucket?.content?.imageUrl[0]?.url ? (
                                  <div className="video-container">
                                    {isPlayingPopup ? (
                                      <video controls>
                                        <source
                                          src={
                                            subBucket?.content?.imageUrl[0].url
                                          }
                                        ></source>
                                      </video>
                                    ) : (
                                      <video>
                                        <source
                                          src={
                                            subBucket?.content?.imageUrl[0].url
                                          }
                                        ></source>
                                      </video>
                                    )}

                                    {isPlayingPopup ? (
                                      // <FontAwesomeIcon className="ml-[40px] text-[#989898]" icon={faPause} style={{color:"#fff",fontSize:"40px"}}/>
                                      ""
                                    ) : subBucket?.content?.imageUrl[0]?.url ? (
                                      <>
                                        <div
                                          className="toggle-view-icon-outer"
                                          onClick={handlePlayVideoPopup}
                                        >
                                          <div className="toggle-view-icon">
                                            <FontAwesomeIcon
                                              className="ml-[40px] text-[#989898]"
                                              icon={faPlay}
                                              style={{
                                                color: "#111111b0",
                                                fontSize: "40px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                ) : subBucket?.cardType == "youtube" ? (
                                  <div className="youtube-container">
                                    <iframe
                                      src={
                                        `https://www.youtube.com/embed/` +
                                        subBucket?.content?.sourceUrl
                                          .split("v=")[1]
                                          .split("&")[0]
                                      }
                                      width="560"
                                      height="315"
                                    ></iframe>
                                  </div>
                                ) : subBucket?.cardType == "facebook" &&
                                  subBucket?.content?.imageUrl[0]?.metaData ? (
                                  <div className="youtube-container">
                                    <iframe
                                      src={
                                        subBucket?.content?.imageUrl[0]
                                          ?.metaData?.embedUrl
                                      }
                                      width="560"
                                      height="315"
                                    ></iframe>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {/* <FontAwesomeIcon icon="fa-solid fa-play" /> */}

                                {subBucket?.cardType ? (
                                  subBucket.cardType == "twitter" ? (
                                    ""
                                  ) : subBucket.cardType == "facebook" ? (
                                    subBucket?.content?.imageUrl[0]
                                      .isAdLibrary ? (
                                      <>
                                        <div className="ad-lib-second-html">
                                          {parse(subBucket.content.html)}
                                        </div>
                                      </>
                                    ) : (
                                      <div className="shared-second-html">
                                        {parse(subBucket.content.html)}
                                      </div>
                                    )
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          ) : subBucket.content.html ? (
                            parse(subBucket.content.html)
                          ) : (
                            <div
                              style={{ maxHeight: "100vh", overflow: "auto" }}
                            >
                              {subBucket?.content?.imageUrl.length > 0 ? (
                                <img
                                  className="w-full"
                                  src={subBucket?.content?.imageUrl[0].url}
                                  alt="card-image"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          )
                        ) : (
                          ""
                        )}
                      </form>
                    </div>
                  )}
                  {bookmarkhandlePopup && (
                    <div
                      className="bucketCreationPopup relative !z-[999]"
                      style={{ height: "100%" }}
                      onClick={closebookmarkPopup}
                    >
                      <form
                        className="addBucket relative w-[85%] md:w-[50%]"
                        onClick={handleChildClick}
                      >
                        <span
                          onClick={closebookmarkPopup}
                          className="cls-btn absolute right-0 top-[7px] w-[30px] h-[30px] bg-[#FF6600] flex justify-center items-center rounded-full"
                        >
                          <FontAwesomeIcon
                            className="cursor-pointer text-white text-[20px]"
                            icon={faClose}
                          />
                        </span>
                        <img
                          className="bookmarkspopup-content"
                          src={imageUrlPopup}
                          alt="bookmarksPopup"
                        />
                      </form>
                    </div>
                  )}
                </div>
                <div className="rightSideCardDetail w-1/3 pl-[30px] sm:pl-[15px] sm:w-full">
                  {code ? (
                    <>
                      <div className="notesHolder">
                        <h4 className="headingtext-content">Notes</h4>
                      </div>
                      <div className="notedescr-content">
                        {/* <ReactQuill theme="snow" value={code} readOnly /> */}
                      </div>
                    </>
                  ) : null}
                  {tags?.length ? (
                    <>
                      <h4 className="headingtext-content tagspace-notecontent">
                        Tags
                      </h4>
                      <div className="shared-tags flex">
                        {tags?.map((tag) => {
                          return (
                            <div className="addtagpublic-content">
                              {tag?.name}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : null}

                  {subBucket?.landingPage ? (
                    subBucket?.landingPage?.sourceUrl ? (
                      subBucket?.landingPage?.sourceUrl != "" &&
                      subBucket?.landingPage?.sourceUrl != "undefined" ? (
                        <>
                          <div className="landingpage-content">
                            Landing Page
                          </div>
                          <div className="flex">
                            <div className="sb-cap-scr">
                              <a
                                href={
                                  subBucket?.landingPage?.status == true
                                    ? subBucket?.landingPage?.url
                                    : LandingPage
                                }
                                target="_blank"
                              >
                                <img
                                  className="landing-imgcontent"
                                  src={
                                    subBucket?.landingPage?.status == true
                                      ? subBucket?.landingPage?.url
                                      : LandingPage
                                  }
                                  alt="LandingPage"
                                />
                              </a>
                            </div>
                          </div>
                          <div className="landing-cardcontent">
                            <a
                              href={subBucket?.landingPage?.sourceUrl}
                              target="_blank"
                            >
                              <div className="purple-imgcontent">
                                <Image
                                  className="pr-2"
                                  src={PurpleLink}
                                  alt="PurpleLink"
                                  style={{height:"auto",width:"auto"}}
                                />
                                Visit Website
                              </div>
                            </a>
                          </div>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Shared;

