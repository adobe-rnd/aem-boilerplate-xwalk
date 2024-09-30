export let customerTemplateCopy = `
<div class="forName">
<div class="happy-customer">
    <div class="info-card">
        <img src="{ribbononeimg}" alt="{ribbononealt}" class="left-top">
        <img src="{ribbontwoimg}" alt="{ribbontwoalt}" class="right-top">
        <img src="{ribbonthreeimg}" alt="{ribbonthreealt}" class="left-bottom">
        <img src="{ribbonfourimg}" alt="{ribbonfouralt}" class="right-bottom">
        <input type="hidden" id="settime" value="{rotationtime}">
        {cards}
    </div>
</div>
</div>
`
export let customerCardCopy =
    `
<div class="forName">
<div class="customer-info {customerClass}" id="{customerId}">
    <div class="card-images">
        <img src="{customerImage}" alt="cutomer img" class="personimg">
    </div>
    <div class="zoom-circleone"></div>
    <div class="zoom-circletwo"></div>
    <div class="zoom-circlethree"></div>
    <div class="customer-comments">
        <div class="arrowup"></div>
        <div class="comments">
            <p>
                <span class="{customerDetailsClass} custinfo">{customerDetails}</span>
                <span class="{customerNameClass} custname">{customerName}</span>
                <span class="{customerProfessionClass} custprofession">{customerProfession}</span>
            </p>
        </div>
    </div>
</div>
</div>
`

// export customerTemplate;
// export customerCard;