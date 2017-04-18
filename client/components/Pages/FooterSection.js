import React from "react";
import Github from '../../Images/Icons/GithubIcon.png'

export default class FooterSection extends React.Component {

	render(){
		let FooterStyle = {
			color:"#ff8a65",
			backgroundColor:"#292B2D",
			paddingLeft:"10px",
			paddingTop:"1%"
		}
		let githubStyle ={
			backgroundColor:"#ff7043",
			marginRight:"50px",
			float:"right",
			height:"32px",
			width:"32px",
			padding:"1px",
			borderRadius:"30px",
			marginTop:"-5px"
		}

		return(
			<div style = {FooterStyle}>
				<div style = {githubStyle}>
					<a href = "https://github.com/sammysamsam/Ohayon-Sequencer/tree/master">
						<img src = {Github} style = {{height:"30px",width:"30px"}}/>  
					</a>
				</div>

				<div className = "row">
					<span style = {{float:"right",marginRight:"30px",marginTop:"-1px"}}> <a style = {{color:"#ff7043"}}href="mailto:sm4478@nyu.edu?subject=Ohayon Sequencer Inquiry"> <i className="material-icons">email</i> </a></span>

					<span style = {{float:"right",marginRight:"25px"}}> Terms</span>
					<span style = {{float:"right",marginRight:"25px"}}> <a style = {{color:"#ff7043"}}href="https://github.com/sammysamsam/Ohayon-Sequencer/blob/master/README.md"> About </a> </span>
					<span style = {{float:"right",marginRight:"25px"}}> Help</span>
				</div>
				<div style = {{color:"#ff8a65", fontSize:"10px",marginLeft:"5px",padding:"2px"}} > 
					<span className = "hide-on-small-only"> ©  2016 Sam Mao & Meet Barot Copyright </span>
				</div>

			</div>
		);
	}
}				