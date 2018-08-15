var file_selector = _ => {
	var file_selector = document .createElement ('input')
	;file_selector .setAttribute ('type', 'file')
	;file_selector .addEventListener ('change', _ => {
		;callbacks .forEach (_fn => {
			;_fn (file_selector .files) } )
		;callbacks = [] })
	var callbacks = []
	return { select: _ => {
		;return new Promise (resolve => {
			;callbacks = callbacks .concat ([ resolve ])
			;file_selector .click () }) } } }



document .addEventListener ('DOMContentLoaded', _ => {
	;S .root (_ => {
                var error_of = x => x && x .error

		;var _file_selector = file_selector ()

		var upload_state = S .data ('nothing')

                var team_id = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the team id' })
                                Oo (document .querySelector ('#team-id[input]') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', _ => {
                                                        if (y .value) {
                                                                ;x (y .value) }
                                                        else {
                                                                ;x ({ error: 'You must fill in the Team ID' }) } }) })) })))

                var teacher_email = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the teacher\'s email' })
                                Oo (document .querySelector ('#email[input]') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (y .value)
                                                                x (y .value)
                                                        else
                                                                x ({ error: 'You must fill in the teacher\'s email' }) }) })) })))
                var first_error = S (() =>
                        error_of (team_id ())
                        || error_of (teacher_email ()) )

                S (_ => {
			var nothing = document .querySelector ('#upload') .querySelector ('#state[of=nothing]')
			var uploading = document .querySelector ('#upload') .querySelector ('#state[of=uploading]')
			var ok = document .querySelector ('#upload') .querySelector ('#state[of=ok]')

			if (upload_state () === 'nothing') {
				 ;nothing .style .visibility = 'visible'
				 ;uploading .style .visibility = 'hidden'
				 ;ok .style .visibility = 'hidden' }
			else if (upload_state () === 'ok') {
				 ;nothing .style .visibility = 'hidden'
				 ;uploading .style .visibility = 'hidden'
				 ;ok .style .visibility = 'visible' }
			else /*if (upload_state () === 'uploading')*/ {
				 ;nothing .style .visibility = 'hidden'
				 ;uploading .style .visibility = 'visible'
				 ;ok .style .visibility = 'hidden' } })

                S (_ => {
			if (upload_state () === 'nothing') {}
			else if (upload_state () === 'ok') {}
			else /*if (upload_state () === 'uploading')*/ {
				document .querySelector ('#upload') .querySelector ('#state[of=uploading]') .querySelector ('[text]') .textContent
				= upload_state () } })


		;['click', 'touch'] .forEach (input => {
			;document .querySelector ('#upload') .querySelector ('#hint[for=click]') .addEventListener (input, _ => {
				if (upload_state () === 'nothing') {
					if (first_error ()) {
						;alert (first_error ()) }
					else if (confirm ('Do you confirm that the Team ID and Teacher email are correct?')) {
						_file_selector .select ()
						.then (files => {
							if (files .length === 1) {
								;var request = new XMLHttpRequest
								;request .upload .addEventListener ('progress', e => {
									;upload_state (((e .loaded / e .total) * 100) .toFixed (2) + '%') })
								;request .addEventListener ('load', e => {
									try {
										var x = JSON .parse (request .responseText)
										if (error_of (x)) {
											;upload_state ('nothing')
											;alert (error_of (x)) }
										else {
											;upload_state ('ok')
											;alert ('Video successfully submitted!') }}
									catch (e) {
										;upload_state ('nothing')
										;alert ('Failed to upload submission!') }})
								;request .open ('POST', '/send-final');

								;var form_data = new FormData
								;form_data .append ('team_id', team_id ())
								;form_data .append ('teacher_email', teacher_email ())
								;form_data .append ('upload', files [0], files [0] .name)

								;request .send (form_data) } }) }} }) }) }) })
