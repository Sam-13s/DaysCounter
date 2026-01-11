from flask import Flask, render_template, request, jsonify
from datetime import datetime
import math
from dateutil.relativedelta import relativedelta

app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

def calculate_time_difference(start_date, end_date):
    delta = abs(end_date - start_date)
    days = delta.days
    weeks = days // 7
    months = days // 30  # Approximate
    years = days // 365  # Approximate
    return {
        'days': days,
        'weeks': weeks,
        'months': months,
        'years': years
    }

def calculate_countdown(target_date):
    now = datetime.now()
    if target_date > now:
        delta = target_date - now
        days = delta.days
        hours, remainder = divmod(delta.seconds, 3600)
        minutes, seconds = divmod(remainder, 60)
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    return None

def calculate_age(birth_date):
    now = datetime.now()
    rd = relativedelta(now, birth_date)
    return {
        'years': rd.years,
        'months': rd.months,
        'days': rd.days,
        'hours': rd.hours,
        'minutes': rd.minutes,
        'seconds': rd.seconds
    }

def get_day_of_week(date):
    return date.strftime('%A')

def calculate_time_elapsed(past_date):
    now = datetime.now()
    delta = now - past_date
    days = delta.days
    weeks = days // 7
    months = days // 30
    years = days // 365
    hours, remainder = divmod(delta.seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    return {
        'years': years,
        'months': months,
        'weeks': weeks,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and request.is_json:
        # Handle AJAX requests
        data = request.get_json()
        start = datetime.strptime(data['start_date'], '%Y-%m-%d')
        end = datetime.strptime(data['end_date'], '%Y-%m-%d')
        result = calculate_time_difference(start, end)
        return jsonify(result)
    else:
        # Handle regular page loads
        result = None
        start_date = request.form.get('start_date', '')
        end_date = request.form.get('end_date', '')
        if request.method == 'POST':
            start = datetime.strptime(start_date, '%Y-%m-%d')
            end = datetime.strptime(end_date, '%Y-%m-%d')
            result = calculate_time_difference(start, end)
        return render_template('index.html', result=result, countdown=None, age=None, day_of_week=None, elapsed=None, start_date=start_date, end_date=end_date)

@app.route('/countdown', methods=['POST'])
def countdown():
    if request.is_json:
        # Handle AJAX requests
        data = request.get_json()
        target = datetime.strptime(data['target_date'], '%Y-%m-%d')
        countdown_data = calculate_countdown(target)
        return jsonify(countdown_data or {'error': 'Invalid date'})
    else:
        # Handle regular form submissions
        target_date = request.form['target_date']
        target = datetime.strptime(target_date, '%Y-%m-%d')
        countdown_data = calculate_countdown(target)
        return render_template('index.html', result=None, countdown=countdown_data, age=None, day_of_week=None, elapsed=None, target_date=target_date)

@app.route('/age', methods=['POST'])
def age():
    if request.is_json:
        # Handle AJAX requests
        data = request.get_json()
        birth = datetime.strptime(data['birth_date'], '%Y-%m-%d')
        age_data = calculate_age(birth)
        return jsonify(age_data)
    else:
        # Handle regular form submissions
        birth_date = request.form['birth_date']
        birth = datetime.strptime(birth_date, '%Y-%m-%d')
        age_data = calculate_age(birth)
        return render_template('index.html', result=None, countdown=None, age=age_data, day_of_week=None, elapsed=None, birth_date=birth_date)

@app.route('/day_of_week', methods=['POST'])
def day_of_week():
    if request.is_json:
        # Handle AJAX requests
        data = request.get_json()
        date = datetime.strptime(data['date'], '%Y-%m-%d')
        day = get_day_of_week(date)
        return jsonify({'day_of_week': day})
    else:
        # Handle regular form submissions
        date_str = request.form['date']
        date = datetime.strptime(date_str, '%Y-%m-%d')
        day = get_day_of_week(date)
        return render_template('index.html', result=None, countdown=None, age=None, day_of_week=day, elapsed=None, date=date_str)

@app.route('/elapsed', methods=['POST'])
def elapsed():
    if request.is_json:
        # Handle AJAX requests
        data = request.get_json()
        past = datetime.strptime(data['past_date'], '%Y-%m-%d')
        elapsed_data = calculate_time_elapsed(past)
        return jsonify(elapsed_data)
    else:
        # Handle regular form submissions
        past_date = request.form['past_date']
        past = datetime.strptime(past_date, '%Y-%m-%d')
        elapsed_data = calculate_time_elapsed(past)
        return render_template('index.html', result=None, countdown=None, age=None, day_of_week=None, elapsed=elapsed_data, past_date=past_date)

@app.route('/live_countdown')
def live_countdown():
    target_date = request.args.get('target')
    if target_date:
        target = datetime.fromisoformat(target_date)
        countdown_data = calculate_countdown(target)
        return jsonify(countdown_data) if countdown_data else jsonify({'error': 'Target date has passed'})
    return jsonify({'error': 'No target date provided'})

if __name__ == '__main__':
    app.run(debug=True)
