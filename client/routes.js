import React from "react";
import { Route, IndexRoute, hashHistory } from "react-router";


import Layout from "./components/Layout/Layout";
import HomeLayout from "./components/Layout/HomeLayout";
import ProjectLayoutMain from "./components/Layout/ProjectLayoutMain";
import DevelopmentStageLayout from "./components/Layout/ProjectLayouts/DevelopmentStage";
import ResultStageLayout from "./components/Layout/ProjectLayouts/ResultStage";
import ToolsAnalysis from "./components/Layout/ToolsAnalysisLayout";


export default (

		<Route path="/" component = {Layout} >
			<IndexRoute component = {HomeLayout}/>
			
			<Route path="Project" component = {ProjectLayoutMain}>
				<Route path="Workspace" component = {DevelopmentStageLayout} /> 
				<Route path="Analysis" component = {ResultStageLayout} /> 
			</Route>
			<Route path="QuickAnalysis" component = {ToolsAnalysis} /> 
		
		</Route>

	)

