MOVES (formerly routines)

3 kind of moves

repeat_type

    repeat_day -> Added to calendar on every day

    repeat_weekly -> Added to calendar if moment().isoWeekDay is same

    repeat_custom -> Added to calendar as follow:

        c_repeat_type (custom-repeat-type)
            week
            month


routine_complitions is where we keep is the routine completed for today or not.
 the data is on user/routine_completions
  model is created_at, date, routine_id

This model is not enough for weekly or monthly so we add c_month = month number
c_week = week number
