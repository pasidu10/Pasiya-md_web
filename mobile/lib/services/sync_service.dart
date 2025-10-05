// File: mobile/lib/services/sync_service.dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../utils/local_db.dart';

const String SERVER_BASE = String.fromEnvironment('PASIYA_SERVER', defaultValue: 'https://your-server.example.com');
const String SYNC_ENDPOINT = '\$SERVER_BASE/api/sync/progress';

class SyncService {
  Future<void> saveLocalRecord(Map<String, dynamic> record) async {
    record['synced'] = record['synced'] ?? false;
    await LocalDB.saveRecord(record);
  }

  Future<List<Map<String, dynamic>>> _getUnsyncedRecords() async {
    final records = await LocalDB.getUnsyncedRecords();
    return records.map((r) => Map<String, dynamic>.from(r)).toList();
  }

  Future<void> _markRecordsSynced(List<String> clientRecordIds) async {
    await LocalDB.markAsSynced(clientRecordIds);
  }

  Future<Map<String, dynamic>> attemptSync() async {
    try {
      final unsynced = await _getUnsyncedRecords();
      if (unsynced.isEmpty) {
        return {'success': true, 'message': 'No unsynced records.', 'attempted': 0, 'synced': 0};
      }
      final payload = jsonEncode({'records': unsynced});
      final response = await http.post(Uri.parse(SYNC_ENDPOINT),
          headers: {'Content-Type': 'application/json'}, body: payload).timeout(Duration(seconds: 20));
      if (response.statusCode == 200) {
        final respJson = jsonDecode(response.body);
        if (respJson != null && respJson['success'] == true) {
          final clientIds = unsynced.map((r) => r['clientRecordId']).where((id) => id != null).map((id) => id.toString()).toList();
          await _markRecordsSynced(clientIds);
          return {'success': true, 'message': 'Synced successfully.', 'attempted': unsynced.length, 'synced': clientIds.length};
        } else {
          return {'success': false, 'message': 'Server responded but indicated failure.', 'serverResponse': respJson};
        }
      } else {
        return {'success': false, 'message': 'Server returned non-200 status.', 'statusCode': response.statusCode, 'body': response.body};
      }
    } catch (e) {
      return {'success': false, 'message': 'Sync attempt failed with exception.', 'error': e.toString()};
    }
  }
}
