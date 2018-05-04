var slot_dates = [ '7/5/2018', '8/5/2018', '9/5/2018', '10/5/2018', '11/5/2018', '13/5/2018', '14/5/2018', '15/5/2018', '16/5/2018', '17/5/2018', '18/5/2018' ]
var slots = Oo (slot_dates,
	o (R .chain (x => [ x + ' Morning' , x + ' Noon',  x + ' Afternoon' ])))

var slot_occupations = S .data ()
// : { Slot_name : null | 'third' | 'second' | 'first' }

...dynamic code...
//e.g. ; slot_occupations (...occupation data...)

document .addEventListener ('DOMContentLoaded', () => {
	S .root (() => {
                var error_of = x => x && x .error;
		var first_available_list = S (() => 
			!! (slot_occupations ()) ?
				Oo (slot_occupations (),
					o (R .map (x => ! (x == 'first'))),
					o (R .filter (x => !! x)),
					o (R .keys))
			:
				undefined)
		var second_available_list = S (() => 
			!! (slot_occupations ()) ?
				Oo (slot_occupations (),
					o (R .map (x => ! (x == 'first' || x == 'second'))),
					o (R .filter (x => !! x)),
					o (R .keys))
			:
				undefined)
		var third_available_list = S (() => 
			!! (slot_occupations ()) ?
				Oo (slot_occupations (),
					o (R .map (x => ! (x == 'first' || x == 'second' || x == 'third'))),
					o (R .filter (x => !! x)),
					o (R .keys))
			:
				undefined)



                var team_id = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the team id' })
                                Oo (document .querySelector ('#team-id[input]') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (y .value)
                                                                x (y .value)
                                                        else
                                                                x ({ error: 'You must fill in the Team ID' })
                                                })
                                        }))
                        })))

                var teacher_email = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the teacher\'s email' })
                                Oo (document .querySelector ('#email[input]') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (y .value)
                                                                x (y .value)
                                                        else
                                                                x ({ error: 'You must fill in the teacher\'s email' })
                                                })
                                        }))
			}))
		)

		var first_choice = Oo (S .data (),
			o (R .tap (x => {
				Oo (document .querySelector ('#first-choice[input] select'),
					oO (y => {
						new MutationObserver (() => {
							x (y .value)
						}) .observe (y, { childList: true });
						y .addEventListener ('change', () => {
							x (y .value)
						});
					}))
			})))

		var second_choice = Oo (S .data (),
			o (R .tap (x => {
				Oo (document .querySelector ('#second-choice[input] select'),
					oO (y => {
						new MutationObserver (() => {
							x (y .value)
						}) .observe (y, { childList: true });
						y .addEventListener ('change', () => {
							x (y .value)
						});
					}))
			})))

		var third_choice = Oo (S .data (),
			o (R .tap (x => {
				Oo (document .querySelector ('#third-choice[input] select'),
					oO (y => {
						new MutationObserver (() => {
							x (y .value)
						}) .observe (y, { childList: true });
						y .addEventListener ('change', () => {
							x (y .value)
						});
					}))
			})))

                var first_error = S (() =>
                        error_of (team_id ())
                        || error_of (teacher_email ())
                        || error_of (first_choice ())
                        || error_of (second_choice ())
                        || error_of (third_choice ())
                )

		; S (() => { ;
			; Oo (document .querySelector ('#first-choice select'),
				o (x => {;
					var target_inner_html = Oo (first_available_list (),
						o (R .without ( [ second_choice (), third_choice () ] )),
						o (R .map (x => '<option>' + x + '</option>')),
						o (R .join ('')))
					var before_value = x .value
					if (target_inner_html !== x .innerHTML) {
						;x .innerHTML = target_inner_html
						if (Oo (x .options, R .map (x => x .value), R .contains (before_value))) {
							;x .value = before_value }
						else {
							;x .value = R .last (x .options) .value}}
				})) })

		; S (() => { ;
			; Oo (document .querySelector ('#second-choice select'),
				o (x => {;
					var target_inner_html = Oo (second_available_list (),
						o (R .without ( [ first_choice (), third_choice () ] )),
						o (R .map (x => '<option>' + x + '</option>')),
						o (R .join ('')))
					var before_value = x .value
					if (target_inner_html !== x .innerHTML) {
						;x .innerHTML = target_inner_html
						if (Oo (x .options, R .map (x => x .value), R .contains (before_value))) {
							;x .value = before_value }
						else {
							;x .value = R .last (x .options) .value}}
				})) })

		; S (() => { ;
			; Oo (document .querySelector ('#third-choice select'),
				o (x => {;
					var target_inner_html = Oo (third_available_list (),
						o (R .without ( [ first_choice (), second_choice () ] )),
						o (R .map (x => '<option>' + x + '</option>')),
						o (R .join ('')))
					var before_value = x .value
					if (target_inner_html !== x .innerHTML) {
						;x .innerHTML = target_inner_html
						if (Oo (x .options, R .map (x => x .value), R .contains (before_value))) {
							;x .value = before_value }
						else {
							;x .value = R .last (x .options) .value}}
				}))})

		; S (() => { ;
			var occupation_selector = slot => occupation => {
				var parts = Oo (slot, o (R . split (' ')))
					var date = Oo (R . head (parts), o (R . split ('/')), o (R .slice (0, -1)), o (R . join ('-')))
				var time = !! (R . last (parts) === 'Morning')?
					'AM'
				:!! (R . last (parts) === 'Noon')?
					'Noon'
				:!! (R . last (parts) === 'Afternoon')?
					'PM'
				:
					undefined

				var slot_selector = time + '-' + date

				return !! (occupation === 'third') ?
					'#occupations #' + slot_selector + ' [taken="1"]'
				: !! (occupation === 'second') ?
					'#occupations #' + slot_selector + ' [taken="1"]' + ',#occupations #' + slot_selector + ' [taken="2"]'
				: !! (occupation === 'first') ?
					'#occupations #' + slot_selector + ' [taken="1"]' + ',#occupations #' + slot_selector + ' [taken="2"]' + ',#occupations #' + slot_selector + ' [taken="3"]'
				: undefined }


			;Oo (Array .from (document .querySelectorAll ('#occupations [taken]')),
				o (R .forEach (x => {
					;x .style .visibility = 'hidden'})))
			;Oo (slot_occupations (),
				o (R .toPairs),
				oO (R .forEach (_x_ => {;
					var slot_name = R .head (_x_)
					var occupation = R .last (_x_)

					if (occupation) {
						;Oo (Array .from (document .querySelectorAll (occupation_selector (slot_name) (occupation))),
							o (R .forEach (x => {
								;x .style .visibility = 'visible'})))
					}
				})))
		}) 

		;['click', 'touch'] .forEach (input => {
			;document .querySelector ('#submit') .querySelector ('#hint[for=click]') .addEventListener (input, () => {
				if (first_error ()) {
					;alert (first_error ()) }
				else {
					if (confirm ('Do you confirm that you want to submit these time slot preferences?')) {
						var clouds = document .createElement ('clouds')
						clouds .style .position = 'fixed'
						clouds .style .left = 0
						clouds .style .right = 0
						clouds .style .top = 0
						clouds .style .bottom = 0
						clouds .style .background = 'black'
						clouds .style .opacity = 0.6
						;document .body .appendChild (clouds)
						;Promise .resolve ()
						.then (() =>
							fetch ('/send-submit', {
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								method: 'POST',
								body: JSON .stringify ({
									team_id: team_id (),
									teacher_email: teacher_email (),
									first: first_choice (),
									second: second_choice (),
									third: third_choice ()
								})
							})
						)
						.then (x => x .json ())
						.then (x => {
							if (error_of (x)) {
								;alert (error_of (x)) }
							else {
								;alert ('Workshop preferences completed!') }
							;window .location .reload (true);
						})
						.catch (() => {
							;alert ('Failed to submit workshop preferences!')
						})
						.then (() => {
							;document .body .removeChild (clouds)
						})
					}
				}
			})
		})

	})
})
