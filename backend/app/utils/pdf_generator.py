from io import BytesIO

from reportlab.lib.pagesizes import A4

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle
)

from reportlab.lib import colors

from reportlab.lib.styles import (
    getSampleStyleSheet
)


def generate_challan_pdf(
    challan
):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4
    )

    elements = []

    styles = getSampleStyleSheet()


    # TITLE
    title = Paragraph(
        "<b>SAREE JOB WORK CHALLAN</b>",
        styles["Title"]
    )

    elements.append(title)

    elements.append(
        Spacer(1, 20)
    )


    # FIRM DETAILS
    firm_details = Paragraph(
        """
        <b>MK Sarees Pvt Ltd</b><br/>
        Surat, Gujarat<br/>
        GST: 24ABCDE1234F1Z5
        """,
        styles["Normal"]
    )

    elements.append(
        firm_details
    )

    elements.append(
        Spacer(1, 20)
    )


    # CHALLAN DETAILS TABLE
    data = [

        ["Challan Number",
         challan.challan_number],

        ["Vendor",
         challan.vendor.name],

        ["Supplier",
         challan.supplier.name],

        ["Quantity",
         f"{challan.quantity} {challan.unit}"],

        ["Program",
         challan.program],

        ["Rate",
        f"Rs. {challan.rate}"],

        ["Transport",
         challan.transport_type],

        ["LR Number",
         challan.lr_number],

        ["Sent Date",
         str(challan.sent_date)],

        ["Status",
         challan.status],
    ]


    table = Table(
        data,
        colWidths=[150, 300]
    )

    table.setStyle(
        TableStyle([

            (
                "BACKGROUND",
                (0, 0),
                (0, -1),
                colors.lightgrey
            ),

            (
                "TEXTCOLOR",
                (0, 0),
                (-1, -1),
                colors.black
            ),

            (
                "GRID",
                (0, 0),
                (-1, -1),
                1,
                colors.black
            ),

            (
                "FONTNAME",
                (0, 0),
                (-1, -1),
                "Helvetica"
            ),

            (
                "BOTTOMPADDING",
                (0, 0),
                (-1, -1),
                10
            ),
        ])
    )

    elements.append(table)

    elements.append(
        Spacer(1, 30)
    )


    # SIGNATURE
    signature = Paragraph(
        """
        <br/><br/>
        _______________________<br/>
        Authorized Signature
        """,
        styles["Normal"]
    )

    elements.append(signature)


    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf