export const fieldDef = {
  items: [{
    id: 'datepicker-6dd0c75352',
    fieldType: 'date-input',
    name: 'dob',
    visible: true,
    type: 'string',
    enabled: true,
    readOnly: false,
    placeholder: '2000-02-13',
    label: {
      visible: true,
      value: 'Date Of Birth',
    },
    events: {
      'custom:setProperty': [
        '$event.payload',
      ],
    },
    format: 'date',
  },
  ],
};

export const markUp = `
<form data-action="undefined" novalidate="" data-redirect-url="" data-thank-you-msg="" data-source="aem" data-rules="true" data-id="undefined">
   <div class="date-wrapper field-dob field-wrapper" data-id="datepicker-6dd0c75352" data-required="false"><label for="datepicker-6dd0c75352" class="field-label">Date Of Birth</label><input type="text" placeholder="2000-02-13" id="datepicker-6dd0c75352" name="dob" autocomplete="off" edit-value="" display-value=""></div>
</form>`.replace(/\n/g, '');
