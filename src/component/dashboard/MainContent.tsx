"use client"

import useSidebarStore from '@/store/useSidebarStore';
import React from 'react'
import CreateResumeMain from './CreateResume/CreateResumeMain';
import ResumeAnalyzerMain from './ResumeAnalyser/ResumeAnalyzerMain';

const MainContent = () => {
  const { currentMenu } = useSidebarStore();

  return (
    <div className="flex-1 p-4">
      {currentMenu === "create-resume" && <CreateResumeMain />}
      {currentMenu === "analyze-resume" && <ResumeAnalyzerMain />}
    </div>
  )
}

export default MainContent
