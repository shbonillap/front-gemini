import { usePDF } from 'react-to-pdf';

const exportPDF = ({ filename }) => {
    const { toPDF, targetRef } = usePDF({ filename: filename });
    return (
        <div>
            <button onClick={() => toPDF()}>Download PDF</button>
            <div ref={targetRef}>
                Content to be generated to PDF
            </div>
        </div>
    )
}

export default exportPDF;
