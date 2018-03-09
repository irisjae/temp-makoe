document .addEventListener ('DOMContentLoaded', () => {
	S .root (() => {
                var error_of = x => x && x .error;


                var school_name = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the school name' })
                                Oo (document .querySelector ('#school #name') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (y .value)
                                                                x (y .value)
                                                        else
                                                                x ({ error: 'You must fill in the school name' })
                                                })
                                        }))
                        }))
                )

                var group = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must choose a year group for the competition' })
                                Oo (document .querySelector ('#group'),
                                        oO (y => {
                                                ['click', 'touch'] .forEach (input => {
                                                        y .querySelector ('#primary #hint[for=click]') .addEventListener (input, () => {
                                                                x ('primary')
                                                        })
                                                        y .querySelector ('#junior-high #hint[for=click]') .addEventListener (input, () => {
                                                                x ('junior-high')
                                                        })
                                                        y .querySelector ('#senior-high #hint[for=click]') .addEventListener (input, () => {
                                                                x ('senior-high')
                                                        })
                                                })
                                        }))
			}))
		)

                var teacher_name = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the teacher name' })
                                Oo (document .querySelector ('#teacher #name') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (y .value)
                                                                x (y .value)
                                                        else
                                                                x ({ error: 'You must fill in the teacher name' })
                                                })
                                        }))
                        }))
                )

                var teacher_email = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the teacher\'s email' })
                                Oo (document .querySelector ('#teacher #email') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('change', () => {
                                                        if (! y .value)
                                                                x ({ error: 'You must fill in the teacher\'s email' })
                                                        else if (! y .validity .valid)
                                                                x ({ error: 'You must fill in a valid email for the teacher' })
                                                        else
                                                                x (y .value)
                                                })
                                        }))
                        }))
                )

                var teacher_mobile = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the teacher\'s mobile' })
                                Oo (document .querySelector ('#teacher #mobile') .querySelector ('input'),
                                        oO (y => {
                                                y .addEventListener ('input', () => {
                                                        if (! y .validity .valid)
                                                                x ({ error: 'You must fill in a valid mobile number for the teacher' })
                                                        else if (! y .value)
                                                                x ({ error: 'You must fill in the teacher\'s mobile number' })
                                                        else if (y .value .length < 8)
                                                                x ({ error: 'You must fill in a mobile number that has 8 digits for the teacher' })
                                                        else
                                                                x (y .value)
                                                })
                                        }))
                        }))
                )

                var students = [1, 2, 3, 4, 5] .map (order => {
                        var dom = document .querySelector ('#student[order="' + order + '"]');

                        var student_name = Oo (S .data (),
                                o (R .tap (x => {
                                        Oo (dom .querySelector ('#name') .querySelector ('input'),
                                                oO (y => {
                                                        y .addEventListener ('change', () => {
                                                                x (y .value)
                                                        })
                                                }))
                                }))
                        )
                        var student_grade = Oo (S .data (),
                                o (R .tap (x => {
                                        x ({ error: 'You must select a grade for each student' })
                                        Oo (dom .querySelector ('#grade') .querySelector ('select'),
                                                oO (y => {
                                                        new MutationObserver (() => {
                                                                x (y .value)
                                                        }) .observe (y, { childList: true });
                                                        y .addEventListener ('change', () => {
                                                                x (y .value)
                                                        });
                                                }))
                                }))
                        )
                        var student_mobile = Oo (S .data (),
                                o (R .tap (x => {
                                        Oo (dom .querySelector ('#mobile') .querySelector ('input'),
                                                oO (y => {
                                                        y .addEventListener ('input', () => {
                                                                if (! y .validity .valid)
									x ({ error: 'For each student\'s mobile, you must fill in a valid mobile number' })
                                                                else if (y .value && y .value .length < 8)
									x ({ error: 'For each student\'s mobile, you must fill in a number with 8 digits' })
                                                                else
                                                                        x (y .value)
                                                        })
                                                }))
                                }))
                        )
                        var student_email = Oo (S .data (),
                                o (R .tap (x => {
                                        Oo (dom .querySelector ('#email') .querySelector ('input'),
                                                oO (y => {
                                                        y .addEventListener ('change', () => {
                                                                if (! y .validity .valid)
                                                                        x ({ error: 'You must fill in a valid email for each student who has an email' })
                                                                else
                                                                        x (y .value)
                                                        })
                                                }))
                                }))
                        )

                        var student = S (() => {
                                if (! student_name () && ! student_mobile () && ! student_email ())
                                        return undefined;
                                else if (! student_name ())
                                        return { error: 'You must fill in every competing student\'s name' }
                                else if (error_of (student_name ()))
                                        return student_name ()
                                else if (error_of (student_grade ()))
                                        return student_grade ()
                                else if (error_of (student_mobile ()))
                                        return student_mobile ()
                                else if (error_of (student_email ()))
                                        return student_email ()
                                else
                                        return {
                                                name: student_name (),
                                                grade: student_grade (),
                                                mobile: student_mobile (),
                                                email: student_email ()
                                        }
                        })
			return student
		})

                var students_info = S (() => {
                        var number_of_students = Oo (students, o (R .findLastIndex (x => x () !== undefined))) + 1
                        if (number_of_students < 3)
                                return { error: 'You must register at least 3 students per team' }
                        else if (number_of_students > 5)
                                return { error: 'You must register at most 5 students per team' }

                        var students_info = Oo (R .range (0, number_of_students),
                                o (R .map (x => students [x] ())));
                        if (Oo (students_info, o (R .any (x => x === undefined))))
				return { error: 'For each competing student, you must fill in the student\'s name' }

                        var individual_error = Oo (students_info, o (R .find (error_of)))
                        if (individual_error)
                                return individual_error
                        else
                                return students_info
                });

                var description = Oo (S .data (),
                        o (R .tap (x => {
                                x ({ error: 'You must fill in the written description' })
                                Oo (document .querySelector ('#description') .querySelector ('textarea'),
                                        oO (y => {
                                                var value = Oo (S .data (y .value), o (R .tap (x => {
                                                        y .addEventListener ('change', () => { x (y .value) })
                                                })));
                                                S (() => {
                                                        if (! value ()) {
                                                                x ({ error: 'You must fill in the written description' })
                                                                return
                                                        }
                                                        var word_limit = (group () === 'primary') ?
                                                                        500
                                                                : (group () === 'junior-high' || group () === 'senior-high') ?
                                                                        1000
                                                                :
                                                                        Infinity
                                                        var used_english = Oo (value (), o (R .any (x => x .match (/[a-zA-Z]/))))
                                                        var used_chinese = Oo (value (), o (R .any (x => x .match (/[\u3400-\u9FBF]/))))
                                                        if (used_english && used_chinese) {
                                                                x ({ error: 'You cannot mix Chinese and English in the written description' })
                                                                return
                                                        }
                                                        if (used_english)
                                                                var word_count = Oo (value (), o (R .split (/\w+/)), o (R .length))
                                                        else if (used_chinese)
                                                                var word_count = Oo (value (), o (R .filter (x => x .match (/[\u3400-\u9FBF]/))), o (R .length))
							
							if (word_count < word_limit)
								x ({ error: 'The written description must be at least ' + word_limit + ' words' })
							else
								x (value ())
						})
					}))
                        }))
                )

                var recommendation = Oo (S .data ({ error: 'You must agree to the competition rules' }),
                        o (R .tap (x => {
                                Oo (document .querySelector ('#recommendation'),
                                        oO (y => {
                                                ['click', 'touch'] .forEach (input => {
                                                        y .querySelector ('#hint[for=click]') .addEventListener (input, () => {
                                                                x ('yes')
                                                        })
                                                })
                                        }))
                        }))
                )


                var first_error = S (() =>
                        error_of (school_name ())
                        || error_of (group ())
                        || error_of (teacher_name ())
                        || error_of (teacher_email ())
                        || error_of (teacher_mobile ())
                        || error_of (students_info ())
                        || error_of (description ())
                        || error_of (recommendation ())
                )


		S (() => {
			Oo (Array .from (document .querySelector ('#group') .querySelectorAll ('#state')),
				o (R .forEach (x => {
					if (x .getAttribute ('of') === group ())
						x .style .visibility = 'visible'
					else
						x .style .visibility = 'hidden'
				})))
		})

		S (() => {
			if (group () === 'primary')
				Oo (Array .from (document .querySelectorAll ('select')),
					oO (R .forEach (x => {
						x .innerHTML = '<option>P1</option><option>P2</option><option>P3</option><option>P4</option><option>P5</option><option>P6</option>'
					}))
				)
			else if (group () === 'junior-high')
				Oo (Array .from (document .querySelectorAll ('select')),
					oO (R .forEach (x => {
						x .innerHTML = '<option>S1</option><option>S2</option><option>S3</option>'
					}))
				)
			else if (group () === 'senior-high')
				Oo (Array .from (document .querySelectorAll ('select')),
					oO (R .forEach (x => {
						x .innerHTML = '<option>S4</option><option>S5</option><option>S6</option>'
					}))
				)
		})

		S (() => {
			var dom = document .querySelector ('#recommendation') .querySelector ('#state');
			if (error_of (recommendation ()))
				dom .style .visibility = 'hidden'
			else
				dom .style .visibility = 'visible'
		})


		;['click', 'touch'] .forEach (input => {
			document .querySelector ('#apply') .querySelector ('#hint[for=click]') .addEventListener (input, () => {
				if (first_error ())
					alert (first_error ())
				else {
					if (confirm ('Do you verify that all the information provided is correct to the best of your knowledge?')) {
						var clouds = document .createElement ('clouds')
						clouds .style .position = 'fixed'
						clouds .style .left = 0
						clouds .style .right = 0
						clouds .style .top = 0
						clouds .style .bottom = 0
						clouds .style .background = 'black'
						clouds .style .opacity = 0.6
						document .body .appendChild (clouds)
						Promise .resolve ()
						.then (() =>
							fetch ('/send-apply', {
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json'
								},
								method: 'POST',
								body: JSON .stringify ({
									school_name: school_name (),
									group: group (),
									teacher_name: teacher_name (),
									teacher_email: teacher_email (),
									teacher_mobile: teacher_mobile (),
									students_info: students_info (),
									description: description (),
									recommendation: recommendation ()
								})
							})
						)
						.then (x => x .json ())
						.then (x => {
							if (error_of (x))
								alert (error_of (x))
							else
								alert ('Application completed!')
						})
						.catch (() => {
							alert ('Failed to submit application!')
						})
						.then (() => {
							document .body .removeChild (clouds)
						})
					}
				}
			})
		})

	})
})
