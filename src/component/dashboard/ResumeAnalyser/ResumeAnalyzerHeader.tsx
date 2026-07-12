import { FileText } from 'lucide-react'
import React from 'react'

const ResumeAnalyzerHeader = () => {
    return (
        <div className="w-full px-3 pb-2">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600">
                        <FileText className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold md:text-2xl">
                            Analyze Resume
                        </h1>
                        <p className="text-sm text-gray-600 md:text-base">
                            Analyze Your Resume for ATS Compatibility
                        </p>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default ResumeAnalyzerHeader
