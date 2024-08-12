import React from 'react';

const Skeleton = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-2 py-6">
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-300 rounded col-span-1"></div>
                    <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-300 rounded col-span-1"></div><br></br>
                    <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                </div>
                <div className="h-4 bg-slate-300 rounded"></div><br></br><br></br>
                <div className="h-4 bg-slate-300 rounded"></div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                    <div className="h-4 bg-slate-300 rounded col-span-1"></div>
                </div>
                <div className="h-4 bg-slate-300 rounded"></div>
            </div>
        </div>
    );
};

export default Skeleton;