function generatePDF() {
    // Get the form data
    const full_name = document.querySelector('input[name=full_name]').value
    const company_name = document.querySelector(
        'input[name=company_name]'
    ).value
    const email = document.querySelector('input[name=email]').value
    const phone = document.querySelector('input[name=phone]').value
    const location = document.querySelector('input[name=location]').value
    const project_type = document.querySelector(
        'input[name=project_type]'
    ).value
    const project_size = document.querySelector(
        'input[name=project_size]'
    ).value
    const completion_date = document.querySelector(
        'input[name=completion_date]'
    ).value
    const message = document.querySelector('textarea[name=message]').value

    // Create a new jsPDF instance
    const doc = new jsPDF()

    // Set the document properties
    doc.setProperties({
        title: 'Resume',
        author: 'Your Name',
        keywords: 'resume, job, experience',
    })

    // Set the font size and text color
    doc.setFontSize(14)
    doc.setTextColor('#333')

    // Add the header
    doc.text(`Full Name: ${full_name}`, 105, 20, { align: 'center' })
    doc.text(`Company Name: ${company_name}`, 105, 30, { align: 'center' })
    doc.text(`Email: ${email}`, 105, 40, { align: 'center' })
    doc.text(`Phone: ${phone}`, 105, 50, { align: 'center' })

    // Add the contact information
    doc.setLineWidth(0.5)
    doc.setDrawColor('#333')
    doc.rect(20, 70, 170, 120) // outer border
    doc.setFontSize(16)
    doc.setFontStyle('bold')
    doc.text('Contact Information', 95, 80, { align: 'center' })
    doc.setFontSize(12)
    doc.setFontStyle('normal')
    doc.text(`Project Type: ${project_type}`, 30, 100)
    doc.line(30, 102, 110, 102) // inner border
    doc.text(`Project Size: ${project_size}`, 30, 110)
    doc.line(30, 112, 110, 112) // inner border
    doc.text(`Completion Date: ${completion_date}`, 30, 120)
    doc.line(30, 122, 110, 122) // inner border
    doc.text(`Location: ${location}`, 30, 130)
    doc.line(30, 132, 110, 132) // inner border

    // Add the message
    doc.setFontSize(12)
    doc.text(`Message: ${message}`, 30, 160)

    // Save the PDF document
    doc.save('contact-form.pdf')
}
